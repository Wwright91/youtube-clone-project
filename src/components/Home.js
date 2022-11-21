import { useEffect, useState } from "react";
import "./Home.css";
import VideoList from "./VideoList";

const popularVideosUrl = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=21&regionCode=US&key=${process.env.REACT_APP_API_KEY}`;

const Home = () => {
  const [popularVideos, setPopularVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingError, setLoadingError] = useState(false);

  useEffect(() => {
    fetch(`${popularVideosUrl}`)
      .then((res) => res.json())
      .then((data) => {
        setPopularVideos(data.items);
        setLoading(false);
        setLoadingError(false);
        console.log(data.items);
      })
      .catch((error) => {
        console.error(error);
        setLoadingError(true);
      });
  }, []);

  return (
    <div>
      <VideoList videos={popularVideos} kind="popular" loading={loading} loadingError={ loadingError} />
    </div>
  );
};

export default Home;
