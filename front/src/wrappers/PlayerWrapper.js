import React, { Component } from "react";
import cx from "classnames";
import Player from "../components/Player";
import Playlist from "../components/Playlist";
import HamburgerButton from "../components/HamburgerButton";
import "../styles/PlayerWrapper.scss";

class PlayerWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = { toggle: false };
  }
  playerHandler = {
    onLoopClicked: () => {
      const { player, socket } = this.props;
      socket.emit("setLoop", !player.loop);
    },
    onPrevClicked: () => {
      const { socket } = this.props;
      socket.emit("playPrev");
    },
    onPlayClicked: () => {
      const { socket } = this.props;
      socket.emit("play");
    },
    onNextClicked: () => {
      const { socket } = this.props;
      socket.emit("playNext");
    },
    onShuffleClicked: () => {
      const { socket } = this.props;
      socket.emit("shuffle");
    },
    onProgressChange: e => {
      const { socket } = this.props;
      socket.emit("seekTo", e.target.value);
    },
    onVolumeChange: e => {
      const { socket } = this.props;
      socket.emit("setVolume", e.target.value);
    }
  };

  render() {
    const { player, playlist } = this.props;
    // console.log("wrapper", playlist);
    const { toggle } = this.state;
    return (
      <>
        <div className={cx("player-wrapper", { "show-playlist": toggle })}>
          <div className="menu">
            <HamburgerButton
              toggle={toggle}
              handleClick={() => {
                this.setState({ toggle: !toggle });
              }}
            />
          </div>
          <Player {...player} {...this.playerHandler} />
          <Playlist playlist={playlist} />
        </div>
      </>
    );
  }
}

export default PlayerWrapper;
