import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Categories.css";

const categoriesURL = `https://youtube.googleapis.com/youtube/v3/videoCategories?part=snippet&regionCode=US&key=${process.env.REACT_APP_API_KEY}`;
const excludedIds = ["18", "21"];

export default function Categories() {
  const [categories, setCategories] = useState(null);
  useEffect(() => {
    fetch(categoriesURL)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        data.items = data.items.filter(
          (item) => !excludedIds.includes(item.id)
        );
        setCategories(data.items);
      });
  }, []);
  return (
    <div className="categories">
      <ul>
        {categories &&
          categories.map((cat, i) => (
            <Link to={`/category/${cat.id}`} key={i}>
              <li>{cat.snippet.title}</li>
            </Link>
          ))}
      </ul>
    </div>
  );
}
