import { useEffect, useState } from "react";
import "./Home.css";
import YouTube from "react-youtube";

const Home = () => {
  const [apidata, setApidata] = useState([]);

  const popularVideos = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=20&regionCode=US&key=${process.env.REACT_APP_API_KEY}`;

  useEffect(() => {
    fetch(`${popularVideos}`)
      .then((res) => res.json())
      .then((data) => setApidata(data.items));
  }, []);

  const opts = {
    height: "390",
    width: "640",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
      enablejsapi: 1,
    },
  };

  function onReady(event) {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  }

  console.log(apidata);

  return (
    <div className="home">
      {apidata.map(({ id, snippet }) => {
        return (
          // <div key={video.id}>
          //   <YouTube videoId={video.id} opts={opts} onReady={onReady} />
          // </div>
          <div className="card">
            <img src={snippet.thumbnails.high.url} />
            <h4>{snippet.title}</h4>
          </div>
        );
      })}
    </div>
  );
};

export default Home;
