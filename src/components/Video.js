import { useParams } from "react-router-dom";
import YouTube from "react-youtube";
import Comments from "./Comments";

import "./Video.css";

const opts = {
  height: "390",
  width: "640",
  playerVars: {
    // https://developers.google.com/youtube/player_parameters
    autoplay: 0,
    // enablejsapi: 1,
  },
};

function onReady(event) {
  // access to player in all event handlers via event.target
  event.target.pauseVideo();
}

export default function Video() {
  const { id } = useParams();
  console.log(id);
  return (
    <div className="videopage">
      <YouTube videoId={id} opts={opts} />
      <Comments id={id} />
    </div>
  );
}
