import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import YouTube from "react-youtube";
import Comments from "./Comments";
import { formatViewsCount } from "./HelperFunctions";
import ReadMoreAndLess from "react-read-more-less";
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
  origin: "https://www.youtube.com",
};

export default function Video() {
  const { id } = useParams();
  const [search] = useSearchParams();
  const channelId = search.get("channelId");
  console.log(channelId);
  const [videoDetails, setVideoDetails] = useState([]);
  const [loadingError, setLoadingError] = useState(false);
  const [channelDetails, setChannelDetails] = useState(null);

  useEffect(() => {
    const fetchVideo = fetch(
      `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${id}&key=${process.env.REACT_APP_API_KEY}`
    );
    const fetchChannel = fetch(
      `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${channelId}&key=${process.env.REACT_APP_API_KEY}`
    );
    Promise.all([fetchVideo, fetchChannel])
      .then((responses) => {
        console.log(responses);
        return Promise.all(
          responses.map((res) => {
            if (!res.ok) throw new Error("I am an error");
            return res.json();
          })
        );
      })
      .then(([video, channel]) => {
        console.log(channel.items);
        setVideoDetails(video.items);
        setChannelDetails(channel.items[0]);
        setLoadingError(false);
      })

      .catch((error) => {
        console.error(error);
        setLoadingError(true);
      });
  }, [id, channelId]);
  console.log(channelDetails);
  return (
    <div className="videopage">
      {loadingError ? (
        <Modal loadingError={loadingError} setLoadingError={setLoadingError} />
      ) : (
        <>
          <YouTube videoId={id} opts={opts} />
          {videoDetails.map(({ snippet, statistics }, i) => {
            return (
              <div key={i}>
                <h2>{snippet.title}</h2>
                <ReadMoreAndLess
                  className="read-more-content"
                  readMoreText="Show more"
                  readLessText="Show less"
                >
                  {snippet.description}
                </ReadMoreAndLess>
                <p>Uploaded on {snippet.publishedAt}</p>
                <p>{formatViewsCount(statistics.viewCount)} views</p>
                <p>{formatViewsCount(statistics.commentCount)} comments</p>
              </div>
            );
          })}
          <Comments id={id} />
          {channelDetails && (
            <div className="channel-details">
              <img src={channelDetails.snippet.thumbnails.default.url} alt="" />
              <h2>{channelDetails.snippet.localized.title}</h2>
              <p>
                {formatViewsCount(channelDetails.statistics.subscriberCount)}{" "}
                subscribers
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
