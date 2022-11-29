import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import VideoList from "./VideoList";
import Modal from "./ErrorModal";
import Categories from "./Categories";
import Sidebar from "./Sidebar";

const SearchResults = () => {
  const { input } = useParams();
  const { num } = useParams();
  const [searchedData, setSearchedData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingError, setLoadingError] = useState(false);

  // const [maxResults, setMaxResults] = useState("");

  // setMaxResults(maxResults);
  // console.log(maxResults);

  useEffect(() => {
    setLoading(true);
    fetch(
      `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=${num}&q=${input}&key=${process.env.REACT_APP_API_KEY}`
    )
      .then((res) => {
        console.log(res);
        if (!res.ok) throw new Error("Error in Search Results Comp");
        return res.json();
      })
      .then((data) => {
        console.log(data.items);
        data = data.items.filter(
          (item) => !item.snippet.thumbnails.high.url.endsWith("-mo")
        );

        setSearchedData(data);
        setLoading(false);
        setLoadingError(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
        setLoadingError(true);
      });
  }, [input, num]);

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
              videos={searchedData}
              kind="search"
              loading={loading}
              loadingError={loadingError}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default SearchResults;
