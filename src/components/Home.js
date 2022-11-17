import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import { formatDuration, formatViewsCount } from "./HelperFunctions";

const popularVideos = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=20&regionCode=US&key=${process.env.REACT_APP_API_KEY}`;

const Home = () => {
  const [apidata, setApidata] = useState([]);

  useEffect(() => {
    fetch(`${popularVideos}`)
      .then((res) => res.json())
      .then((data) => setApidata(data.items));
  }, []);

  console.log(apidata);

  return (
    <div className="home">
      {apidata.map(({ id, snippet, statistics, contentDetails }) => {
        return (
          <Link key={id} to={`videos/${id}`}>
            <div className="card">
              <div className="img-wrapper">
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
