import { useEffect, useState } from "react";
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

  return (
    <div className="home">
      {apidata.map(({ id, snippet }) => {
        return (
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
