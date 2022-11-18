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
      .then((data) => setApidata(data.items));
  }, []);

  // console.log(apidata);

  function handleSubmit(e) {
    e.preventDefault();

    if (!inputValue) {
      alert("Please input a value");
    } else {
      fetch(
        `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&%2CcontentDetails%2Cstatistic&q=${inputValue}&key=${process.env.REACT_APP_API_KEY}`
      )
        .then((res) => {
          console.log(res)
           return res.json()
        })
        .then((data) => {
          console.log(data);
          setSearchedData(data.items);
        });
      setInputValue("");
      setSubmit(true);
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Search Videos:
          <input
            type="text"
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
            }}
            required
          />
        </label>
        <button>Submit</button>
      </form>

      <div className="home">
        {submit
          ? searchedData.map(({ id, snippet, contentDetails, statistics }) => {
              return (
                <Link key={id} to={`videos/${id.videoId}`}>
                  <div className="card">
                    <div className="img-wrapper">
                      <img src={snippet.thumbnails.high.url} />
                      <span id="duration">
                        {/* {formatDuration(contentDetails.duration)} */}
                      </span>
                    </div>

                    <h4>{snippet.title}</h4>
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
          : apidata.map(({ id, snippet, contentDetails, statistics }) => {
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
