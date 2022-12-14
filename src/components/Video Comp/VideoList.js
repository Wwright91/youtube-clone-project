import CardSkeleton from "../Home Comp/CardSkeleton";
import { formatDuration, formatViewsCount } from "../Home Comp/HelperFunctions";
import { Link } from "react-router-dom";
import "../Home Comp/Home.css";

const VideoList = ({ videos, kind, loading, loadingError }) => {
  return (
    <>
      {loading && <CardSkeleton />}
      {kind !== "popular"
        ? videos.map(({ id, snippet }, i) => {
            return (
              <Link
                key={i}
                to={`/videos/${id.videoId}?channelId=${snippet.channelId}`}
              >
                <div className="card">
                  <div className="img-wrapper">
                    <img src={snippet.thumbnails.medium.url} alt="thumbnail" />
                  </div>

                  <h4 className="video-title">{snippet.title}</h4>
                  {kind !== "related" && (
                    <div className="details">
                      <p>
                        <span>{snippet.channelTitle}</span>
                      </p>
                    </div>
                  )}
                </div>
              </Link>
            );
          })
        : videos.map(({ id, snippet, contentDetails, statistics }, i) => {
            return (
              <Link key={i} to={`videos/${id}?channelId=${snippet.channelId}`}>
                <div className="card">
                  <div className="img-wrapper">
                    <img src={snippet.thumbnails.medium.url} alt="thumbnail" />
                    <span id="duration">
                      {formatDuration(contentDetails.duration)}
                    </span>
                  </div>

                  <h4 className="video-title">{snippet.title}</h4>
                  <div className="details">
                    <p>
                      <span>{snippet.channelTitle}</span>
                      <span>
                        {" "}
                        {formatViewsCount(statistics.viewCount)} Views
                      </span>
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
    </>
  );
};

export default VideoList;
