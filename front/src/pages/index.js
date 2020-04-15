import React from "react";
import { HashRouter as Router, Route, Switch ,router} from "react-router-dom";
import Player from "./Player";
import YoutubeDownloader from "./YoutubeDownloader";

const MainRouter = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={YoutubeDownloader} />
        <Route path="/player" component={Player} />
      </Switch>
    </Router>
  );
};

export default MainRouter;
