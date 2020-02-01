import React, { Component } from "react";
import cx from "classnames";
import LoopIcon from "@material-ui/icons/Loop";
import SvgIcon from "@material-ui/core/SvgIcon";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import ShuffleIcon from "@material-ui/icons/Shuffle";
import VolumeIcon from "./VolumeIcon";
import "../styles/Player.scss";
class Player extends Component {
  render() {
    const {
      cover = "cover-default.png",
      pos = 50,
      length = 100,
      current = "0:00",
      duration = "0:00",
      title = "Title",
      subtitle = "Album - Artist",
      volume = 50,
      paused = true, //
      loop = false,
      onLoopClicked = () => {},
      onPrevClicked = () => {},
      onPlayClicked = () => {},
      onNextClicked = () => {},
      onShuffleClicked = () => {},
      onProgressChange = () => {},
      onVolumeChange = () => {}
    } = this.props;

    return (
      <div className="player">
        <div className="player-cover">
          <img src={cover} alt="cover" />
        </div>
        <div className="player-noncover">
          <div className="player-timer">
            <span>{current}</span>
            <span>{duration}</span>
          </div>
          <div className="player-progress slider">
            <input
              type="range"
              value={pos}
              max={length}
              onChange={onProgressChange}
            />
          </div>
          <ul className="player-controls">
            <li
              className={cx("control control-small", {
                "control-dimmed": !loop,
                "control-active": loop
              })}
              onClick={onLoopClicked}
            >
              <SvgIcon component={LoopIcon} />
            </li>
            <li className="control" onClick={onPrevClicked}>
              <SvgIcon component={SkipPreviousIcon} />
            </li>
            <li className="control control-outlined" onClick={onPlayClicked}>
              <SvgIcon component={paused ? PlayArrowIcon : PauseIcon} />
            </li>
            <li className="control" onClick={onNextClicked}>
              <SvgIcon component={SkipNextIcon} />
            </li>
            <li className="control control-small" onClick={onShuffleClicked}>
              <SvgIcon component={ShuffleIcon} />
            </li>
          </ul>
          <h1 className="player-title">{title}</h1>
          <h2 className="player-subtitle">{subtitle}</h2>
          <div className="player-volume">
            <div className="player-volume-icon">
              <VolumeIcon volume={volume} />
            </div>
            <div className="player-volume-slider slider">
              <input
                type="range"
                value={volume}
                max="100"
                onChange={onVolumeChange}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Player;
