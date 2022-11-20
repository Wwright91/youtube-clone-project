import { useEffect, useState } from "react";
import VideoList from "./VideoList";
import { useParams } from "react-router-dom";

const SearchResults = () => {
  const [searchedData, setSearchedData] = useState([]);
  const { input } = useParams();
  // console.log(input)
  useEffect(() => {
    fetch(
      `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=${input}&key=${process.env.REACT_APP_API_KEY}`
    )
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((data) => {
        console.log(data.items);
        data = data.items.filter(
          (item) => !item.snippet.thumbnails.high.url.endsWith("-mo")
        );

        setSearchedData(data);
      });
  }, []);

  return (
    <div>
      <VideoList videos={searchedData} kind="search" />
    </div>
  );
};

export default SearchResults;
