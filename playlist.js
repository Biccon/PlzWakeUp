import { Playlist } from "./modules/player";
const pl = new Playlist();
const item = {
  path: "./resources/audio/METEOR-_50jtkDnObw.mp3",
  title: "METEOR-_50jtkDnObw"
};
const item2 = {
  path: "./resources/audio/RUN DAMOIM 달려-mY8PWmcUVnQ.mp3",
  title: "RUN DAMOIM 달려-mY8PWmcUVnQ"
};
const item3 = {
  path: "./resources/audio/RUN DAMOIM 달려-mY8PWmcUVnQ.mp3",
  title: "3"
};
const item4 = {
  path: "./resources/audio/RUN DAMOIM 달려-mY8PWmcUVnQ.mp3",
  title: "4"
};
const item5 = {
  path: "./resources/audio/RUN DAMOIM 달려-mY8PWmcUVnQ.mp3",
  title: "5"
};
pl.addItem(item);
pl.addItem(item2);
pl.addItem(item3);
pl.addItem(item4);
pl.addItem(item5);
pl.setLoop(true);
console.log(pl);
for (let i = 0; i < 7; i++) {
  pl.playNext();
}
console.log(pl);
