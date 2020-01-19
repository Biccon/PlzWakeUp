// 모든 파일에서 한 개의 플레이어에 접근 가능하게 하기 위해서
import { MPlayer } from "mplayer-as-promised";
import NodeID3 from "node-id3";
import fs from "fs";
import path from "path";

class Player {
  constructor() {
    this.player = new MPlayer();
    this.item = null;
    this.path = "./resources/audio";
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
    const item = await this.getPlayer().openFile(`${this.path}/${filename}`);
    this.setItem(item);
    return item;
  }
  async shutdown() {
    return await this.player.shutdown();
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
    if (!this.getItem()) return;
    return this.getItem().play();
  }
  async pause() {
    if (!this.getItem()) return;
    return this.getItem().pause();
  }
  async stop() {
    if (!this.getItem()) return;
    return this.getItem().stop();
  }
  async listen() {
    if (!this.getItem()) return;
    return this.getItem().listen();
  }
  async seekTo(val) {
    if (!this.getItem()) return;
    return this.getItem().seekTo(val);
  }
  async seekBy(val) {
    if (!this.getItem()) return;
    return this.getItem().seekBy(val);
  }
  async getCurrentTime() {
    if (!this.getItem()) return;
    return this.getItem().getCurrentTime();
  }
  async getCurrentPercent() {
    if (!this.getItem()) return;
    return this.getItem().getCurrentPercent();
  }
  async getLength() {
    if (!this.getItem()) return;
    return this.getItem().getLength();
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
  async getID3() {
    const item = this.getItem();
    const file = (item && item.file) || null;

    let tags = NodeID3.read(file);
    NodeID3.read(file, (err, tags) => {
      console.log(tags);
    });
    console.log(tags);
  }

  async getPlayingFile() {
    const item = this.getItem();
    return item ? item.file : "";
  }
}

export default new Player();
