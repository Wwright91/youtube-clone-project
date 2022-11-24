import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Categories from "./Categories";

import VideoList from "./VideoList";
const videosFromCategoryURL = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&regionCode=US&maxResults=21&key=${process.env.REACT_APP_API_KEY}`;
export default function Category() {
  const { id } = useParams();
  const [videos, setVideos] = useState(null);

  useEffect(() => {
    fetch(videosFromCategoryURL + `&videoCategoryId=${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setVideos(data.items);
      });
  }, [id]);
  return (
    <>
      <Categories />
      <div className="home">
        {videos && (
          <VideoList
            videos={videos}
            loading={false}
            loadingError={false}
            kind="category"
          />
        )}
      </div>
    </>
  );
}
