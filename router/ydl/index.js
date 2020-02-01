import { Router } from "express";
import ydlManager from "../../modules/ydl-manager";

ydlManager.setCallback(stream => {
  // db에 추가?
});

const router = Router();
const findStream = id => {
  const streams = ydlManager.getStreams();

  return streams.find(stream => stream.id === id);
};

router.get("/list", (req, res) => {
  let streams = ydlManager.getStreams();

  streams = streams.map(stream => {
    const { video, id, state, title, artist, progress } = stream;
    return { video, id, state, title, artist, progress };
  });

  res.send(streams);
});

router.get("/add/:id", (req, res) => {
  const { id } = req.params;
  let stream = findStream(id) || ydlManager.download(id);
  res.send(stream);
});

router.get("/start/:id", (req, res) => {
  const { id } = req.params;
  const stream = findStream(id);
  if (stream) stream.start();
  res.send(stream);
});
export default router;
