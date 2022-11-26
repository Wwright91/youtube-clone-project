import { useEffect, useState } from "react";
import "./Home.css";
import VideoList from "./VideoList";
import Modal from "./ErrorModal";
import Categories from "./Categories";
import Sidebar from "./Sidebar";

const popularVideosUrl = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=21&regionCode=US&key=${process.env.REACT_APP_API_KEY}`;

const Home = () => {
  const [popularVideos, setPopularVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingError, setLoadingError] = useState(false);

  useEffect(() => {
    fetch(`${popularVideosUrl}`)
      .then((res) => {
        if (!res.ok) throw new Error("Throwing Throwing");
        return res.json();
      })
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
    <>
      <Categories />
      <div className="home-wrapper">
        <Sidebar />

        <div className="home">
          {loadingError ? (
            <Modal
              loadingError={loadingError}
              setLoadingError={setLoadingError}
            />
          ) : (
            <VideoList
              videos={popularVideos}
              kind="popular"
              loading={loading}
              loadingError={loadingError}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
