import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import YouTube from "react-youtube";
import Comments from "./Comments";
import { formatViewsCount, formatDate } from "./HelperFunctions";
import ReadMoreAndLess from "react-read-more-less";
import Modal from "./ErrorModal";

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
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              className="bi bi-hand-thumbs-up"
                              viewBox="0 0 16 16"
                              id="up"
                            >
                              <path d="M8.864.046C7.908-.193 7.02.53 6.956 1.466c-.072 1.051-.23 2.016-.428 2.59-.125.36-.479 1.013-1.04 1.639-.557.623-1.282 1.178-2.131 1.41C2.685 7.288 2 7.87 2 8.72v4.001c0 .845.682 1.464 1.448 1.545 1.07.114 1.564.415 2.068.723l.048.03c.272.165.578.348.97.484.397.136.861.217 1.466.217h3.5c.937 0 1.599-.477 1.934-1.064a1.86 1.86 0 0 0 .254-.912c0-.152-.023-.312-.077-.464.201-.263.38-.578.488-.901.11-.33.172-.762.004-1.149.069-.13.12-.269.159-.403.077-.27.113-.568.113-.857 0-.288-.036-.585-.113-.856a2.144 2.144 0 0 0-.138-.362 1.9 1.9 0 0 0 .234-1.734c-.206-.592-.682-1.1-1.2-1.272-.847-.282-1.803-.276-2.516-.211a9.84 9.84 0 0 0-.443.05 9.365 9.365 0 0 0-.062-4.509A1.38 1.38 0 0 0 9.125.111L8.864.046zM11.5 14.721H8c-.51 0-.863-.069-1.14-.164-.281-.097-.506-.228-.776-.393l-.04-.024c-.555-.339-1.198-.731-2.49-.868-.333-.036-.554-.29-.554-.55V8.72c0-.254.226-.543.62-.65 1.095-.3 1.977-.996 2.614-1.708.635-.71 1.064-1.475 1.238-1.978.243-.7.407-1.768.482-2.85.025-.362.36-.594.667-.518l.262.066c.16.04.258.143.288.255a8.34 8.34 0 0 1-.145 4.725.5.5 0 0 0 .595.644l.003-.001.014-.003.058-.014a8.908 8.908 0 0 1 1.036-.157c.663-.06 1.457-.054 2.11.164.175.058.45.3.57.65.107.308.087.67-.266 1.022l-.353.353.353.354c.043.043.105.141.154.315.048.167.075.37.075.581 0 .212-.027.414-.075.582-.05.174-.111.272-.154.315l-.353.353.353.354c.047.047.109.177.005.488a2.224 2.224 0 0 1-.505.805l-.353.353.353.354c.006.005.041.05.041.17a.866.866 0 0 1-.121.416c-.165.288-.503.56-1.066.56z" />
                            </svg>{" "}
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
