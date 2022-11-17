import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const popularVideos = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=20&regionCode=US&key=${process.env.REACT_APP_API_KEY}`;

const Home = () => {
  const [apidata, setApidata] = useState([]);

  useEffect(() => {
    fetch(`${popularVideos}`)
      .then((res) => res.json())
      .then((data) => setApidata(data.items));
  }, []);

  console.log(apidata);

  function formatDuration(duration) {
    duration = duration.slice(2);
    duration = duration.replace("H", ":");
    duration = duration.replace("M", ":");
    duration = duration.replace("S", "");
    return duration;
  }

  function formatViewsCount(views) {
    if (views.length >= 4 && views.length < 7) {
      views = views.slice(0, -3) + "," + views.slice(-3);
    } else if (views.length >= 7) {
      if (views[1] !== "0") {
        views = views[0] + "." + views[1] + "M";
      } else {
        views = views[0] + "M";
      }
    }
    return views;
  }

  return (
    <div className="home">
      {apidata.map(({ id, snippet, statistics, contentDetails }) => {
        return (
          <Link key={id} to={`videos/${id}`}>
            <div className="card">
              <div class="img-wrapper">
                <img src={snippet.thumbnails.high.url} />
                <span id="duration">
                  {formatDuration(contentDetails.duration)}
                </span>
              </div>

              <h4>{snippet.title}</h4>
              <div className="details">
                <p>{snippet.channelTitle}</p>
                <p>
                  {/* <span> {formatDuration(contentDetails.duration)} </span> */}
                  <span> {formatViewsCount(statistics.viewCount)} Views</span>
                </p>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default Home;
