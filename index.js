import express from "express";
import http from "http";
import mainRouter from "./router/main";
import playerRouter from "./router/player";
import ydlRouter from "./router/ydl";
import ioRouter from "./router/socket";
const app = express();
const server = http.Server(app);
const io = ioRouter(server);

app.use("/", mainRouter);
app.use("/player", playerRouter);
app.use("/ydl", ydlRouter);
server.listen(4000);
