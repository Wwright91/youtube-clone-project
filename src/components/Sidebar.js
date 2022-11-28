import { Link } from "react-router-dom";
import "./Sidebar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faNewspaper,
  faHouse,
  faMusic,
  faFilm,
  faGamepad,
} from "@fortawesome/free-solid-svg-icons";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <ul>
        <Link to="/">
          <li>
            <FontAwesomeIcon icon={faHouse} />
            <span>Home</span>
          </li>
        </Link>
        <Link to="/category/10">
          <li>
            <FontAwesomeIcon icon={faMusic} />
            <span>Music</span>
          </li>
        </Link>
        <Link to="/category/30">
          <li>
            <FontAwesomeIcon icon={faFilm} />
            <span>Movies</span>
          </li>
        </Link>
        <Link to="/category/20">
          <li>
            <FontAwesomeIcon icon={faGamepad} />
            <span>Gaming</span>
          </li>
        </Link>
        <Link to="/category/25">
          <li>
            <i class="fa-solid fa-newspaper"></i>
            <FontAwesomeIcon icon={faNewspaper} />
            <span>News</span>
          </li>
        </Link>
      </ul>
    </div>
  );
}
