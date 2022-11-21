import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import YouTube from "react-youtube";
import Comments from "./Comments";
import { formatViewsCount } from "./HelperFunctions";
import ReadMoreAndLess from "react-read-more-less"
import Modal from "./ErrorModal";

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
  const [loadingError, setLoadingError] = useState(false);

  useEffect(() => {
    fetch(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${id}&key=${process.env.REACT_APP_API_KEY}akjnanok`)
      .then((res) => {
        if(!res.ok)
          throw new Error("I am an error"); 
       return res.json()
      })
    .then((data) => {
      // console.log(data.items)
      setVideoDetails(data.items)
      setLoadingError(false);
    })
    .catch((error) => {
      console.error(error);
      setLoadingError(true);
    });
  }, []);
  
  console.log(videoDetails)

  return (
    <div className="videopage">
    {loadingError ? (
        <Modal loadingError={loadingError} setLoadingError={ setLoadingError} />) : (
          <>
        <YouTube videoId={id} opts={opts} />
        {videoDetails.map(({ snippet, statistics }, i) => {
          return (<div key={i}>
            <h2>{snippet.title}</h2>
            <ReadMoreAndLess
               className="read-more-content"
              readMoreText="Show more"
              readLessText="Show less" >
            {snippet.description}</ReadMoreAndLess>
            <p>Uploaded on {snippet.publishedAt}</p>
            <p>{formatViewsCount(statistics.viewCount)} views</p>
            <p>{formatViewsCount(statistics.commentCount)} comments</p>
            </div>)
      })}
            <Comments id={id} />
            </>
    )}
      </div>
  );
}
