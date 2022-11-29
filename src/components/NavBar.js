import { Link } from "react-router-dom";
import Searchbar from "./Searchbar";
import "./NavBar.css";

const NavBar = () => {
  return (
    <header>
      <article class="youtube-logo">
        <Link to="/">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/YouTube_Logo_2017.svg/1024px-YouTube_Logo_2017.svg.png?20220605194644"
            alt=""
          />
        </Link>
      </article>
      <Searchbar />
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default NavBar;
