import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import "./MobileMenu.css";
const MobileMenu = ({ setShowMobileMenu }) => {
  return (
    <div className="mobile-menu-container">
      <div className="close-menu-container">
        <FontAwesomeIcon
          icon={faCircleXmark}
          id="close-menu"
          onClick={() => setShowMobileMenu(false)}
        />
      </div>
      <nav id="mobile-menu">
        <ul>
          <li>
            <Link to="/" onClick={() => setShowMobileMenu(false)}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" onClick={() => setShowMobileMenu(false)}>
              About
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default MobileMenu;
