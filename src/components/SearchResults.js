import { useEffect, useState } from "react";
import VideoList from "./VideoList";
import { useParams } from "react-router-dom";
import Modal from "./ErrorModal";

const SearchResults = () => {
  const [searchedData, setSearchedData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { input } = useParams();
  // console.log(input)

  const [loadingError, setLoadingError] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(
      `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=${input}&key=${process.env.REACT_APP_API_KEY}`
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
  }, []);

  return (
    <div>
      {loadingError ? (
        <Modal loadingError={loadingError} setLoadingError={setLoadingError} />
      ) : (
        <VideoList
          videos={searchedData}
          kind="search"
          loading={loading}
          loadingError={loadingError}
        />
      )}
    </div>
  );
};

export default SearchResults;
