import express from "express";
import player from "./modules/player";
import mainRouter from "./router/main";
import playerRouter from "./router/player";
import ydlRouter from "./router/ydl";
const app = express();
app.listen(80);
app.use("/", mainRouter);
app.use("/player", playerRouter);
app.use("/ydl", ydlRouter);

import p from "./modules/player";
(async () => {
  // await p.openFile("./resources/audio/psycho.mp3");
  // console.log(p.getPlayer());
  // console.log(p.getPlayer().mplayer);
  // console.log(await p.seekTo(30));
  // p.listen()
  //   .then(async () => {
  //     console.log(p.getPlayer());
  //     console.log("end");
  //     console.log("test");
  //   })
  //   .catch(console.error);
})();
