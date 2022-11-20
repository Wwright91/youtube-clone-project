import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import YouTube from "react-youtube";
import Comments from "./Comments";
import { formatViewsCount } from "./HelperFunctions";

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
  const [videoDetails, setVideoDetails] = useState([])

  useEffect(() => {
  fetch(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${id}&key=${process.env.REACT_APP_API_KEY}`)
  .then((res) => res.json())
    .then((data) => {
      // console.log(data.items)
    setVideoDetails(data.items)
  });
  }, []);
  
  console.log(videoDetails)

  return (
    <div className="videopage">
      <YouTube videoId={id} opts={opts} />
      {videoDetails.map(({ snippet, statistics }) => {
        return (<div>
          <h2>{snippet.title}</h2>
          <p>{snippet.description}</p>
          <p>Uploaded on {snippet.publishedAt}</p>
          <p>{formatViewsCount(statistics.viewCount)} views</p>
          </div>)
      })}
      <Comments id={id} />
    </div>
  );
}
