import ydlManager from "./modules/ydl-manager";

const stream = ydlManager.download(
  "https://www.youtube.com/watch?v=mY8PWmcUVnQ"
);
stream.start();

ydlManager.setCallback(stream => {
  const { filename } = stream;
  console.log(filename);
});
