import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import VideoList from "./VideoList";
import Modal from "./ErrorModal";
import "./Home.css";

const popularVideosUrl = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=21&regionCode=US&key=${process.env.REACT_APP_API_KEY}`;

const Home = () => {
  const [popularVideos, setPopularVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingError, setLoadingError] = useState(false);
  const [pageToken, setPageToken] = useState(null);

  useEffect(() => {
    fetch(`${popularVideosUrl}`)
      .then((res) => {
        if (!res.ok) throw new Error("Throwing Throwing");
        return res.json();
      })
      .then((data) => {
        console.log(data.nextPageToken);
        setPageToken(data.nextPageToken);
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

  const fetchData = () => {
    console.log(`${popularVideosUrl}&pageToken=${pageToken}`);
    fetch(`${popularVideosUrl}&pageToken=${pageToken}`)
      .then((res) => {
        if (!res.ok) throw new Error("Throwing Throwing");
        return res.json();
      })
      .then((data) => {
        setPageToken(data.nextPageToken);
        setPopularVideos([...popularVideos, ...data.items]);
        setLoading(false);
        setLoadingError(false);
      })
      .catch((error) => {
        console.error(error);
        setLoadingError(true);
      });
  };
  console.log(popularVideos);
  return (
    <main>
      <InfiniteScroll
        dataLength={popularVideos.length} //This is important field to render the next data
        next={fetchData}
        hasMore={true}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
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
      </InfiniteScroll>
    </main>
  );
};

export default Home;
