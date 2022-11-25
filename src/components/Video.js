import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import YouTube from "react-youtube";
import Comments from "./Comments";
import { formatViewsCount, formatDate } from "./HelperFunctions";
import ReadMoreAndLess from "react-read-more-less";
import Modal from "./ErrorModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";

import "./Video.css";
import VideoList from "./VideoList";

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
  const [videoDetails, setVideoDetails] = useState([]);
  const [loadingError, setLoadingError] = useState(false);
  const [channelDetails, setChannelDetails] = useState(null);
  const [relatedVids, setRelatedVids] = useState(null);

  useEffect(() => {
    const fetchVideo = fetch(
      `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${id}&key=${process.env.REACT_APP_API_KEY}`
    );
    const fetchChannel = fetch(
      `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${channelId}&key=${process.env.REACT_APP_API_KEY}`
    );
    const fetchRelatedVids = fetch(
      `https://youtube.googleapis.com/youtube/v3/search?part=snippet&relatedToVideoId=${id}&maxResults=10&type=video&key=${process.env.REACT_APP_API_KEY}`
    );

    Promise.all([fetchVideo, fetchChannel, fetchRelatedVids])
      .then((responses) => {
        console.log(responses);

        return Promise.all(
          responses.map((res) => {
            if (!res.ok) throw new Error("I am an error");
            return res.json();
          })
        );
      })
      .then(([video, channel, relVids]) => {
        console.log("video", video);
        console.log(channel.items);
        console.log(relVids.items);
        setVideoDetails(video.items);
        setChannelDetails(channel.items[0]);
        setRelatedVids(relVids.items);
        setLoadingError(false);
      })

      .catch((error) => {
        console.error(error);
        setLoadingError(true);
      });
  }, [id, channelId]);
  console.log("relatedVids", relatedVids);
  return (
    <div className="videopage">
      {loadingError ? (
        <Modal loadingError={loadingError} setLoadingError={setLoadingError} />
      ) : (
        <>
          <div className="video-container">
            <YouTube videoId={id} opts={opts} />
          </div>

          <div className="details-relvids-wrapper">
            <div className="channel-details-and-comments">
              {videoDetails.map(({ snippet, statistics }, i) => {
                return (
                  <div key={i}>
                    <h2 className="video-title">{snippet.title}</h2>
                    {channelDetails && (
                      <div className="channel-wrapper">
                        <div className="channel-details">
                          <img
                            src={channelDetails.snippet.thumbnails.default.url}
                            alt="channgel logo"
                            id="channel-logo"
                          />
                          <div>
                            <h4>{channelDetails.snippet.localized.title}</h4>
                            <p>
                              {formatViewsCount(
                                channelDetails.statistics.subscriberCount
                              )}{" "}
                              subscribers
                            </p>
                          </div>
                        </div>
                        <div>
                          <p>
                            <FontAwesomeIcon icon={faThumbsUp} />{" "}
                            {statistics.likeCount}
                          </p>
                          <p>Uploaded on {formatDate(snippet.publishedAt)}</p>
                        </div>
                      </div>
                    )}
                    <p>{formatViewsCount(statistics.viewCount)} views</p>
                    <div className="video-description">
                      <ReadMoreAndLess
                        className="read-more-content"
                        readMoreText="Show more"
                        readLessText="Show less"
                      >
                        {snippet.description}
                      </ReadMoreAndLess>
                    </div>

                    <p>{formatViewsCount(statistics.commentCount)} comments</p>
                  </div>
                );
              })}

              <Comments id={id} />
            </div>
            <div className="related-videos">
              {relatedVids && (
                <VideoList
                  videos={relatedVids}
                  loading={false}
                  kind="related"
                />
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
