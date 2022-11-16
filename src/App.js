import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [apidata, setApidata] = useState([]);

  const popularVideos = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=20&regionCode=US&key=${process.env.REACT_APP_API_KEY}`

  useEffect(() => {
    fetch(
      `${popularVideos}`
    )
      .then((res) => res.json())
      .then(setApidata);
  }, []);

  console.log(apidata);

  return <div className="App"></div>;
}

export default App;
