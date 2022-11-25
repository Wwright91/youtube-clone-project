import "./Sidebar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faNewspaper,
  faHouse,
  faFire,
  faMusic,
  faVideo,
  faGamepad,
} from "@fortawesome/free-solid-svg-icons";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <ul>
        <li>
          <FontAwesomeIcon icon={faHouse} />
          <span>Home</span>
        </li>
        <li>
          <FontAwesomeIcon icon={faFire} />
          <span>Trending</span>
        </li>
        <li>
          <FontAwesomeIcon icon={faMusic} />
          <span>Music</span>
        </li>
        <li>
          <FontAwesomeIcon icon={faVideo} />
          <span>Video</span>
        </li>
        <li>
          <FontAwesomeIcon icon={faGamepad} />
          <span>Gaming</span>
        </li>
        <li>
          <i class="fa-solid fa-newspaper"></i>
          <FontAwesomeIcon icon={faNewspaper} />
          <span>News</span>
        </li>
      </ul>
    </div>
  );
}
