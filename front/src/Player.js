import React, { Component } from "react";
import PlayerWrapper from "./wrappers/PlayerWrapper";
import socketio from "socket.io-client";

class Player extends Component {
  state = {
    player: {
      pos: 0,
      length: 100,
      current: "0:00",
      duration: "0:00",
      title: "Title",
      subtitle: "Album - Artist",
      volume: 50,
      loop: true
    },
    playlist: {
      title: "현재 재생중인 곡",
      duration: "0:00",
      playlist: []
    }
  };
  componentWillMount() {
    const socket = socketio.connect(":4000");

    socket.on("player", player => {
      const { artist, album } = player;
      this.setState({
        player: { ...player, subtitle: `${album} - ${artist}` }
      });
      // console.log(player);
    });

    socket.on("playlist", playlist => {
      console.log("server", playlist);
      this.setState({ playlist });
    });

    this.socket = socket;
  }

  render() {
    const { player, playlist } = this.state;
    return (
      <PlayerWrapper socket={this.socket} player={player} playlist={playlist} />
    );
  }
}

export default Player;
