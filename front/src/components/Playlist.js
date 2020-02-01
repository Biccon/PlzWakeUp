import React, { Component } from "react";
import PlaylistItem from "./PlaylistItem";
import "../styles/Playlist.scss";

class Playlist extends Component {
  render() {
    const {
      title = "빈 플레이리스트",
      duration = "0:00",
      playlist = []
    } = this.props.playlist;
    // console.log(playlist);
    // console.log("playlist props", this.props.playlist);
    return (
      <div className="playlist">
        <div className="playlist-header">
          <h1 className="playlist-title">{title}</h1>
          <span className="playlist-duration">{duration}</span>
        </div>
        <div className="playlist-items">
          {playlist.map((item, index) => {
            const { title } = item;
            return <PlaylistItem item={item} key={index + title} />;
          })}
        </div>
      </div>
    );
  }
}

export default Playlist;
