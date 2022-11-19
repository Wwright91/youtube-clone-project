import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import { formatDuration, formatViewsCount } from "./HelperFunctions";

const popularVideos = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=20&regionCode=US&key=${process.env.REACT_APP_API_KEY}`;

const Home = () => {
  const [apidata, setApidata] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [searchedData, setSearchedData] = useState([]);
  const [submit, setSubmit] = useState(false);

  useEffect(() => {
    fetch(`${popularVideos}`)
      .then((res) => res.json())
      .then((data) => {
        setApidata(data.items);
        console.log(data.items);
      });
  }, []);

  function handleSubmit(e) {
    e.preventDefault();

    if (!inputValue) {
      alert("Please input a value");
    } else {
      fetch(
        `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=${inputValue}&key=${process.env.REACT_APP_API_KEY}`
      )
        .then((res) => {
          console.log(res);
          return res.json();
        })
        .then((data) => {
          console.log(data.items);
          data = data.items.filter(
            (item) => !item.snippet.thumbnails.high.url.endsWith("-mo")
          );

          setSearchedData(data);
        });
      setInputValue("");
      setSubmit(true);
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="search-form">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
          required
        />
        <button>Search</button>
      </form>

      <div className="home">
        {submit
          ? searchedData.map(({ id, snippet }, i) => {
              return (
                <Link key={i} to={`videos/${id.videoId}`}>
                  <div className="card">
                    <div className="img-wrapper">
                      <img src={snippet.thumbnails.medium.url} />
                      <span id="duration">
                        {/* {formatDuration(contentDetails.duration)} */}
                      </span>
                    </div>

                    <h4 className="video-title">{snippet.title}</h4>
                    <div className="details">
                      <p>
                        <span>{snippet.channelTitle}</span>
                        <span>
                          {" "}
                          {/* {formatViewsCount(statistics.viewCount)} Views */}
                        </span>
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })
          : apidata.map(({ id, snippet, contentDetails, statistics }, i) => {
              return (
                <Link key={i} to={`videos/${id}`}>
                  <div className="card">
                    <div className="img-wrapper">
                      <img src={snippet.thumbnails.medium.url} />
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
    </div>
  );
};

export default Home;
