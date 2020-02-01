import React from "react";
import VolumeUpIcon from "@material-ui/icons/VolumeUp";
import VolumeDownIcon from "@material-ui/icons/VolumeDown";
import VolumeMuteIcon from "@material-ui/icons/VolumeMute";
import SvgIcon from "@material-ui/icons/VolumeUp";

function VolumeIcon({ volume }) {
  let iconComponent = volume > 50 ? VolumeUpIcon : VolumeDownIcon;
  iconComponent = volume === 0 ? VolumeMuteIcon : iconComponent;

  return <SvgIcon component={iconComponent} />;
}
export default VolumeIcon;
