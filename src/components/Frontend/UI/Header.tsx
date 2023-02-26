import { NavLink } from "react-router-dom";
import "./Header.scss";

const Header = () => {
  return (
    <header className="header">
      <div className="header__logo">
        <NavLink to="/">Roly Hermans</NavLink>
      </div>
      <ul className="header__nav-group">
        <li className="header__nav-item">
          <NavLink className={({ isActive }) => (isActive ? "active" : undefined)} to="/" end>
            Gallery
          </NavLink>
        </li>
        <li className="header__nav-item">
          <NavLink className="header__NavLink" to="/about">
            About
          </NavLink>
        </li>
        <li className="header__nav-item">
          <NavLink className="header__NavLink" to="/contact">
            Contact
          </NavLink>
        </li>
      </ul>
    </header>
  );
};

export default Header;
