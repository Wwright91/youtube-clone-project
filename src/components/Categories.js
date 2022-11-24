import { useEffect, useState } from "react";
import "./Categories.css";

const categoriesURL = `https://youtube.googleapis.com/youtube/v3/videoCategories?part=snippet&regionCode=US&key=${process.env.REACT_APP_API_KEY}`;

export default function Categories() {
  const [categories, setCategories] = useState(null);
  useEffect(() => {
    fetch(categoriesURL)
      .then((res) => res.json())
      .then((data) => setCategories(data.items));
  }, []);
  return (
    <div className="categories">
      <ul>
        {categories &&
          categories.map((cat, i) => <li key={i}>{cat.snippet.title}</li>)}
      </ul>
    </div>
  );
}
