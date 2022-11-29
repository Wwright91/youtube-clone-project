import { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import Searchbar from "./Searchbar";
import MobileMenu from "./MobileMenu";
import "./NavBar.css";

const NavBar = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);

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
      <FontAwesomeIcon
        icon={faBars}
        id="hamburger"
        onClick={() => setShowMobileMenu(!showMobileMenu)}
      />
      {showMobileMenu && <MobileMenu setShowMobileMenu={setShowMobileMenu} />}
      <nav id="desktop-menu">
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
