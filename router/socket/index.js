import socketio from "socket.io";
import player from "../../modules/player";
import { playlist } from "../player";

export default server => {
  const io = socketio(server);
  function fmtMSS(s) {
    return (s - (s %= 60)) / 60 + (9 < s ? ":" : ":0") + s;
  }

  io.on("connection", socket => {
    const playLoop = async filename => {
      try {
        const item = await player.openFile(filename);
        if (item) {
          const currentItemEnded = await item.listen();
          const nextItem = playlist.playNext();
          if (nextItem) playLoop(nextItem);
        }
      } catch (error) {
        console.error(error);
      }
    };
    const handlers = {
      async setVolume(data) {
        const { playing } = player.getState();
        if (playing) await player.setVolume(data);
      },
      async getVolume() {
        return player.getVolume()
      },
      setLoop(loop) {
        playlist.setLoop(loop);
      },
      async playPrev() {
        const nextItem = playlist.playPrev();
        if (nextItem) playLoop(nextItem);
        else await player.stop();
      },
      async playNext() {
        const nextItem = playlist.playNext();
        if (nextItem) playLoop(nextItem);
        else await player.stop();
      },
      shuffle() {
        playlist.shuffle();
      },
      async play() {
        const { playing } = player.getState();
        if (playing) await player.pause();
        else await player.play();
      },
      async seekTo(seek) {
        await player.seekTo(seek);
      },
      async player() {
        const {
          playing,
          pos,
          length,
          title,
          artist,
          album
        } = player.getState();
        const current = fmtMSS(pos);
        const duration = fmtMSS(length);
        const volume = 50;
        const data = {
          playing,
          paused: !playing,
          pos,
          length,
          current,
          duration,
          title,
          album,
          artist,
          loop: playlist.getLoop()
        };
        socket.emit("player", data);
      },
      async playlist() {
        let totalDuration = 0;
        const list = await Promise.all(
          playlist.getPlaylist().map(async (item, index) => {
            const { title, album, artist } = player.getFileID3(item);
            const dur = Math.floor((await player.getDuration(item)) || 0);
            const active = playlist.currentIndex() === index;
            totalDuration += dur;
            return { title, album, artist, duration: fmtMSS(dur), active };
          })
        );
        socket.emit("playlist", {
          title: "현재 재생중인 곡",
          duration: fmtMSS(totalDuration),
          playlist: list
        });
      }
    };
    Object.entries(handlers).forEach(([key, value]) => socket.on(key, value));
    const playerInterval = setInterval(() => {
      handlers.player();
      handlers.playlist();
    }, 1000);
    socket.on("disconnect", () => {
      clearInterval(playerInterval);
    });
  });
  return io;
};
