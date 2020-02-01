import { Router } from "express";
const router = Router();
// router.get("/", (req, res) => {
//   res.send('a')
// });

router.get("/cover/:filename", (req, res) => {
  const { filename } = req.params;
  const coverImage = player.getCover(filename + ".mp3");

  res.setHeader("Content-Type", "image/jpeg");
  res.setHeader(
    "Content-Dispositon",
    `attachment; filename='${encodeURIComponent(filename)}.jpeg'`
  );
  res.send(coverImage);
});
export default router;
