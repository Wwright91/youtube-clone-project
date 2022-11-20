import "./NavBar.css";
import { Link } from "react-router-dom";
import Searchbar from "./Searchbar";

const NavBar = () => {
  return (
    <header>
      <article>
        <Link to="/">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/YouTube_Logo_2017.svg/1024px-YouTube_Logo_2017.svg.png?20220605194644"
            alt=""
          />
        </Link>
      </article>

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
    <Searchbar/>
    </header>
  );
};

export default NavBar;
