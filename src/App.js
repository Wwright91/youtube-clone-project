import { useEffect, useState } from "react";
import YouTube from "react-youtube";
import "./App.css";

function App() {
  const [apidata, setApidata] = useState([]);

  const popularVideos = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=20&regionCode=US&key=${process.env.REACT_APP_API_KEY}`

  useEffect(() => {
    fetch(
      `${popularVideos}`
    )
      .then((res) => res.json())
      .then(data => setApidata(data.items));
  }, []);

  const opts = {
    height: '390',
    width: '640',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  function onReady(event) {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  }

  console.log(apidata);

  return <div className="App">
    {apidata.map(video => {
      return( <div key={video.id}>
        <YouTube videoId={  video.id} opts={opts} onReady={onReady}/>
      </div>)
    })}
  
  </div>;
}

export default App;
