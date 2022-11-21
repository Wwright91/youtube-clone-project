import CardSkeleton from "./CardSkeleton";
import { formatDuration, formatViewsCount } from "./HelperFunctions";
import { Link } from "react-router-dom";
import "./Home.css";

const VideoList = ({ videos, kind, loading, loadingError }) => {
  return (
    <div className="home">
      {loading && <CardSkeleton />}
      {kind !== "popular"
        ? videos.map(({ id, snippet }, i) => {
            return (
              <Link key={i} to={`/videos/${id.videoId}`}>
                <div className="card">
                  <div className="img-wrapper">
                    <img src={snippet.thumbnails.medium.url} alt="thumbnail" />
                    <span id="duration">
                      {/* {formatDuration(contentDetails.duration)} */}
                    </span>
                  </div>

                  <h4 className="video-title">{snippet.title}</h4>
                  <div className="details">
                    <p>
                      <span>{snippet.channelTitle}</span>
                    </p>
                  </div>
                </div>
              </Link>
            );
          })
        : videos.map(({ id, snippet, contentDetails, statistics }, i) => {
            return (
              <Link key={i} to={`videos/${id}`}>
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
    </div>
  );
};

export default VideoList;
