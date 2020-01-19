import fs from "fs";
import ydl from "ytdl-core";
import { getInfo } from "youtube-dl";
import ffmpeg from "fluent-ffmpeg";
import axios from "axios";
import NodeID3 from "node-id3";

class YdlManager {
  constructor() {
    this.audioPath = `./resources/audio`;
    this.streams = [];
    this.callback = null;
  }

  downloadByPlatlist(playlist) {
    //todo
  }

  setCallback(cb) {
    this.callback = cb;
  }

  download(video) {
    const newStream = new Stream(video, this.audioPath);
    newStream.onFinished(this.onDownloaded.bind(this));
    this.streams = [...this.streams, newStream]; // 새로운 stream 추가
    return newStream;
  }

  onDownloaded(finishedStream) {
    if (this.callback) this.callback(finishedStream);
    this.streams = this.streams.filter(stream => stream !== finishedStream);
    finishedStream.destroy();
  }

  getStreams() {
    return this.streams;
  }
}

class Stream {
  constructor(id, path) {
    this.id = id;
    this.video = `https://www.youtube.com/watch?v=${id}`;
    this.state = "queued";
    this.started = false;
    this.initialized = false;
    this.path = path;
    this.filename = "stream.mp3";
    this.progress = {
      downloaded: 0,
      total: 0
    };
    this.queued = new Date();

    this.info = null; // ydl.on('info')
    this.title = null;
    this.artist = null;
    this.album = null;
    this.description = null;
    this.year = null;
    this.image = null;
  }

  getInfo(video) {
    if (!this.initialized) {
      this.state = "initializing";
      return new Promise((resolve, reject) => {
        getInfo(video, async (err, info) => {
          if (err) {
            reject(err);
          } else {
            this.info = info;

            const {
              fulltitle,
              artist,
              album,
              description,
              release_year,
              thumbnail,
              _filename,
              ext
            } = info;
            this.title = fulltitle;
            this.artist = artist;
            this.album = album;
            this.description = description;
            this.year = release_year;
            this.filename =
              _filename.substring(0, _filename.lastIndexOf(ext)) + "mp3";

            const res = await axios.get(thumbnail, {
              responseType: "arraybuffer"
            });
            this.image = res.data;
            this.initialized = true;
            this.state = "initialized";

            resolve();
          }
        });
      });
    } else return Promise.resolve();
  }

  async init() {
    await this.getInfo(this.video);
  }

  async start() {
    if (!this.initialized) await this.getInfo(this.video);
    if (this.started) return Promise.resolve();

    this.state = "downloading";
    this.fullPath = `${this.path}/${this.filename}`;

    this.ydl_stream = ydl(this.video, {
      // filter: "audioonly",
      // quality: "highestaudio"
    }).on("progress", (chunkLength, downloaded, total) => {
      if (!this.started) this.started = true;

      this.progress = {
        downloaded,
        total
      };
    });

    this.write_stream = fs.createWriteStream(this.fullPath);

    this.ffmpeg_stream = ffmpeg(this.ydl_stream)
      // .audioBitrate(320)
      .on("end", () => this.writeID3())
      .toFormat("mp3")
      .pipe(this.write_stream);
  }

  writeID3() {
    const { image } = this;

    const { title, artist, album, description, year } = this;
    const tag = {
      title,
      artist,
      image,
      album,
      comment: {
        text: description
      },
      year
    };

    this.write_stream.end();
    NodeID3.write(tag, this.fullPath, () => {
      this.state = "downloaded";
      this.onFinishedCb(this);
    });
  }

  onFinished(cb) {
    this.onFinishedCb = cb;
  }

  destroy() {
    delete this;
  }
}

export default new YdlManager();
