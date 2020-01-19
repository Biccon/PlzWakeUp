import player from "../../modules/player";
import { Router } from "express";
const router = Router();
router.get("/", (req, res) => {
  res.send(player);
});
router.get("/playing", async (req, res) => {
  const playing = player.getPlaying();
  const file = await player.getPlayingFile();
  const metadata = await player.getMetadata();

  const result = { playing, file, metadata };

  res.send(result);
});

router.get("/play/:filename", async (req, res) => {
  const { filename } = req.params;
  res.send(await player.openFile(filename));
});

router.get("/state", async (req, res) => {
  const data = {
    pos: await player.getCurrentTime(),
    length: await player.getLength(),
    percent: await player.getCurrentPercent()
  };
  res.send(data);
});
router.get("/control/:state/:value?", async (req, res) => {
  const { state, value = 0 } = req.params;
  switch (state) {
    case "play":
      await player.play();
      break;
    case "pause":
      await player.pause();
      break;
    case "stop":
      await player.stop();
      break;
    case "seek":
      player.seekTo(value);
      break;
    default:
      break;
  }
  res.send(state);
});

export default router;
