import React, { Component } from "react";
import cx from "classnames";
class PlaylistItem extends Component {
  render() {
    const { item } = this.props;
    const {
      thumbnail = "cover-default.png",
      title = "Title",
      album = "Album",
      artist = "Artist",
      duration = "0:00",
      active = false,
      onClick = () => console.log(this, "item click")
    } = item;
    const subtitle = `${album} - ${artist}`;
    return (
      <div className={cx("playlist-items-item", { active })} onClick={onClick}>
        <img className="item-thumbnail" src={thumbnail} alt="thumbnail" />
        <div className="item-info">
          <h3 className="item-info-title">{title}</h3>
          <span className="item-info-subtitle">{subtitle}</span>
        </div>
        <span className="item-info-duration">{duration}</span>
      </div>
    );
  }
}

export default PlaylistItem;
