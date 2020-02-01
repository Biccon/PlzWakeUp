import player, { Playlist } from "../../modules/player";
import { Router } from "express";
const router = Router();

const pl = new Playlist();
pl.addItem("Psycho-PyyT5tHbOLw.mp3");
pl.addItem("METEOR-_50jtkDnObw.mp3");
pl.addItem(
  "Tiger Den (Feat. Jvcki Wai) (호랑이소굴 (Feat. Jvcki Wai))-xmXHQUAWLA8.mp3"
);
pl.setLoop(true);
router.get("/", (req, res) => {
  res.send(pl); //playlist
});

router.get("/add/:filename", (req, res) => {
  const { filename } = req.params;
  pl.addItem(filename);
  res.send(pl.getPlaylist());
});
router.get("/play/:index", async (req, res) => {
  const playLoop = filename => {
    player.openFile(filename).then(item => {
      item.listen().then(current => {
        const nextItem = pl.playNext();
        if (nextItem) playLoop(nextItem);
      });
    });
  };

  const { index } = req.params;
  const item = pl.playByIndex(index);
  playLoop(item);
  res.send(index);
});

router.get("/playing", async (req, res) => {
  const playing = player.getPlaying();
  if (player.getItem()) {
    const file = await player.getPlayingFile();
    const {
      title,
      album,
      artist,
      image: {
        imageBuffer: { data }
      }
    } = await player.getID3();

    const metadata = {
      title,
      album,
      artist
      // cover: data
    };

    const result = { playing, file, metadata };

    res.send(result);
  }
  res.send({ playing });
});

router.get("/state", async (req, res) => {
  const data = {
    playing: player.getPlaying(),
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
      await player.seekTo(value);
      break;
    default:
      break;
  }
  res.send(state);
});

const playlist = pl;
export default router;
export { playlist };
