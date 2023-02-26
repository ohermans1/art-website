import { Link } from "react-router-dom";
import "./Header.scss";

const Header = () => {
  return (
    <header className="header">
      <div className="header__logo">
        <Link className="header__link" to="/">
          Roly Hermans
        </Link>
      </div>
      <ul className="header__nav-group">
        <li className="header__nav-item">
          <Link className="header__link" to="/">
            Gallery
          </Link>
        </li>
        <li className="header__nav-item">
          <Link className="header__link" to="/about">
            About
          </Link>
        </li>
        <li className="header__nav-item">
          <Link className="header__link" to="/contact">
            Contact
          </Link>
        </li>
      </ul>
    </header>
  );
};

export default Header;
