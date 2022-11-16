import "./NavBar.css";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <header>
      <article>
        <h1>YouTube</h1>
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
    </header>
  );
};

export default NavBar;
