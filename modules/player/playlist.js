class Playlist {
  constructor() {
    this._init();
  }

  _init() {
    this.playlist = [];
    this.item = null;
    this.itemIndex = -1;
    this.loop = false;
  }

  count() {
    return this.playlist.length;
  }

  getPlaylist() {
    return this.playlist;
  }
  /**
   * @param {number} index
   */
  checkIndexBound(index) {
    index = Number.parseInt(index);
    return !(typeof index !== "number" || index < 0 || index >= this.count());
  }

  currentItem() {
    return this.item;
  }

  currentIndex() {
    return this.itemIndex;
  }

  /**
   *
   * @param {*} item
   */
  getIndexByItem(item) {
    return this.playlist.indexOf(item);
  }

  /**
   *
   * @param {number} index
   */
  getItemByIndex(index) {
    return this.playlist[index];
  }

  /**
   *
   * @param {*} item
   */
  addItem(item) {
    this.playlist = [...this.playlist, item];
  }

  /**
   *
   * @param {*} item
   */
  removeItem(item) {
    const index = this.getIndexByItem(item);

    removeItemByIndex(index);
  }

  /**
   * @param {number} index
   */
  removeItemByIndex(index) {
    if (!this.checkIndexBound(index)) return null;
    if (this.itemIndex === index) {
      // 현재 재생중인 곡을 삭제시
    } else {
      // 재생중 아닌 곡 삭제시
    }
  }

  /**
   * @param {boolean} loop
   */
  setLoop(loop) {
    this.loop = loop;
  }

  getLoop() {
    return this.loop;
  }

  shuffle() {
    function shuffle(a) {
      var j, x, i;
      for (i = a.length; i; i -= 1) {
        j = Math.floor(Math.random() * i);
        x = a[i - 1];
        a[i - 1] = a[j];
        a[j] = x;
      }
    }
    shuffle(this.playlist);
    const tempIndex = this.getIndexByItem(this.item);
    if (tempIndex > 0)
      [this.playlist[0], this.playlist[tempIndex]] = [
        this.playlist[tempIndex],
        this.playlist[0]
      ];
    this.itemIndex = 0;
  }

  /**
   * @param {number} index
   * @returns {item}
   * @description index를 통해 재생하고, 재생하는 item을 반환함
   */
  playByIndex(index) {
    if (!this.checkIndexBound(index)) {
      this.item = null;
      this.itemIndex = -1;
    } else {
      this.item = this.playlist[index];
      this.itemIndex = index;
    }
    return this.item;
  }

  playFirst() {
    this.itemIndex = -1;
    return this.playByIndex(this.itemIndex);
  }

  playLast() {
    this.itemIndex = this.count() - 1; // count 0이면 자동으로 -1됨
    return this.playByIndex(this.itemIndex);
  }

  getNextItem() {
    return this.getItemByIndex(this.getNextIndex());
  }

  getNextIndex() {
    let { itemIndex } = this;
    if (!this.checkIndexBound(++itemIndex)) itemIndex = this.loop ? 0 : -1;

    return itemIndex;
  }

  playNext() {
    const itemIndex = this.getNextIndex();
    return this.playByIndex(itemIndex);
  }

  getPrevItem() {
    return this.getItemByIndex(this.getPrevIndex());
  }

  getPrevIndex() {
    let { itemIndex } = this;
    if (!this.checkIndexBound(--itemIndex)) itemIndex = this.count(); //this.loop ? this.count() : -1;

    return itemIndex;
  }

  playPrev() {
    const itemIndex = this.getPrevIndex();
    return this.playByIndex(itemIndex);
  }
}
export { Playlist };
