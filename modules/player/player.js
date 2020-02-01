// 모든 파일에서 한 개의 플레이어에 접근 가능하게 하기 위해서
import { MPlayer } from "mplayer-as-promised";
import NodeID3 from "node-id3";
import fs from "fs";
import path from "path";
import mp3dur from "mp3-duration";

class Player {
  constructor() {
    this.player = new MPlayer();
    this.item = null;
    this.path = "./resources/audio";
    this.state = {
      playing: false,
      pos: 0,
      length: 0,
      title: "Title",
      artist: "Artist",
      album: "Album"
    };
    setInterval(async () => {
      if (this.getItem()) {
        const { title, artist, album } = this.getID3() || {
          title: "Title",
          artist: "Artist",
          album: "Album"
        };
        const newState = {
          item: this.getItem(),
          playing: this.getPlaying(),
          pos: Math.floor((await this.getCurrentTime()) || 0),
          length: Math.floor((await this.getLength()) || 0),
          title,
          artist,
          album
        };
        this.state = newState;
      } else {
        this.state = {
          playing: false,
          pos: 0,
          length: 0,
          title: "Title",
          artist: "Artist",
          album: "Album"
        };
      }
    }, 300);
  }

  getState() {
    return this.state;
  }

  getAudioFiles() {
    let list = fs.readdirSync(this.path);
    list = list.filter(filename => {
      return path.extname(filename) === ".mp3";
    });
    return list;
  }
  getCover(filename) {
    const tags = NodeID3.read(`${this.path}/${filename}`);

    return tags.image.imageBuffer;
  }
  getPlayer() {
    return this.player;
  }
  // player method
  async openFile(filename) {
    const filePath = `${this.path}/${filename}`;
    if (fs.existsSync(filePath)) {
      try {
        const item = await this.getPlayer().openFile(filePath);
        this.setItem(item);
        return item;
      } catch (error) {
        console.error("openFile", error);
        return null;
      }
    } else {
      return null;
    }
  }

  async shutdown() {
    try {
      return await this.player.shutdown();
    } catch (err) {
      console.error(err);
      return null;
    }
  }
  // item method
  getItem() {
    return this.player.activeItem;
    // return this.item;
  }
  setItem(item) {
    this.item = item;
  }
  async play() {
    try {
      if (!this.getItem()) return;
      return this.getItem().play();
    } catch (err) {
      console.error(err);
      return;
    }
  }
  async pause() {
    try {
      if (!this.getItem()) return;
      return this.getItem().pause();
    } catch (err) {
      console.error(err);
      return;
    }
  }
  async stop() {
    try {
      if (!this.getItem()) return;
      return this.getItem().stop();
    } catch (err) {
      console.error(err);
      return;
    }
  }
  async listen() {
    try {
      if (!this.getItem()) return;
      return this.getItem().listen();
    } catch (err) {
      console.error(err);
      return;
    }
  }
  async seekTo(val) {
    try {
      if (!this.getItem()) return;
      return this.getItem().seekTo(val);
    } catch (err) {
      console.error(err);
      return;
    }
  }
  async seekBy(val) {
    try {
      if (!this.getItem()) return;
      return this.getItem().seekBy(val);
    } catch (err) {
      console.error(err);
      return;
    }
  }
  async getCurrentTime() {
    try {
      if (!this.getItem()) return;
      return this.getItem().getCurrentTime();
    } catch (err) {
      console.error(err);
      return;
    }
  }
  async getCurrentPercent() {
    try {
      if (!this.getItem()) return;
      return this.getItem().getCurrentPercent();
    } catch (err) {
      console.error(err);
      return;
    }
  }
  async getLength() {
    try {
      if (!this.getItem()) return;
      return this.getItem().getLength();
    } catch (err) {
      console.error(err);
      return;
    }
  }
  async getVolume() {
    try {
      if (!this.getItem()) return;
      return this.getItem().getVolume();
    } catch (err) {
      console.error(err);
      return;
    }
  }
  async setVolume(volume) {
    try {
      if (!this.getItem()) return;
      return this.getItem().setVolume(volume);
    } catch (err) {
      console.error(err);
      return;
    }
  }
  getPlaying() {
    const item = this.getItem();
    const playing = item && item.playing ? true : false;
    return playing;
  }
  async getMetadata() {
    const item = this.getItem();
    return item.getMetadata();
  }
  getID3() {
    const item = this.getItem();
    const file = (item && item.file) || null;
    if (file) {
      let tags = NodeID3.read(file);
      return tags;
    }
    return null;
  }
  async getDuration(filename) {
    return new Promise((resolve, reject) => {
      mp3dur(`${this.path}/${filename}`, (err, duration) => {
        if (err) reject(err);
        resolve(duration);
      });
    });
  }
  getFileID3(filename) {
    return NodeID3.read(`${this.path}/${filename}`);
  }

  async getPlayingFile() {
    const item = this.getItem();
    return item ? item.file : "";
  }
}

export default new Player();
