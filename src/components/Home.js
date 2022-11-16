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
    },
  };

  function onReady(event) {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  }

  console.log(apidata);

  return (
    <div>
      {apidata.map((video) => {
        return (
          <div key={video.id}>
            <YouTube videoId={video.id} opts={opts} onReady={onReady} />
          </div>
        );
      })}
    </div>
  );
};

export default Home;
