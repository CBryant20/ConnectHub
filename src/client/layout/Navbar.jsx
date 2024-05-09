import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { logout, selectToken } from "../features/auth/authSlice";

import DropDownMenu from "./DropDownMenu";

import "./Navbar.scss";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const token = useSelector(selectToken);
  const currentPath = location.pathname;

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = async () => {
    await dispatch(logout());
    navigate("/");
  };

  return (
    <nav className='navbar'>
      <h1>Connect Hub</h1>

      <div className='nav-button'>
        <div className='navbar-large-screen'>
          {currentPath === "/login" || currentPath === "/register" ? (
            <li>
              <NavLink to='/'>Home</NavLink>
            </li>
          ) : currentPath === "/users" ? (
            <li>
              <NavLink to='/messages'>Messages</NavLink>
            </li>
          ) : currentPath === "/messages" ? (
            <li>
              <NavLink to='/users'>My Info</NavLink>
            </li>
          ) : currentPath.startsWith("/messages") ? (
            <>
              <li>
                <NavLink to='/messages'>Messages</NavLink>
              </li>
              <li>
                <NavLink to='/users'>My Info</NavLink>
              </li>
            </>
          ) : null}

          {token ? (
            <li>
              <a onClick={handleLogout}>Log Out</a>
            </li>
          ) : currentPath !== "/login" && currentPath !== "/register" ? (
            <li>
              <NavLink to='/login'>Log In</NavLink>
            </li>
          ) : null}
        </div>
      </div>

      <div className='menu-toggle' onClick={toggleMenu}>
        <span
          className={`material-symbols-outlined ${
            isOpen ? "icon-close" : "icon-menu"
          }`}
        >
          {isOpen ? "close" : "menu"}
        </span>
      </div>

      {isOpen && (
        <div className={`dropdown-menu ${isOpen ? "open" : ""}`}>
          <DropDownMenu setOpen={setIsOpen} />
        </div>
      )}
    </nav>
  );
}
