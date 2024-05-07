import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { logout, selectToken } from "../features/auth/authSlice";

import "./Navbar.scss";

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const token = useSelector(selectToken);
  const currentPath = location.pathname;

  const handleLogout = async () => {
    await dispatch(logout());
    navigate("/");
  };

  return (
    <nav className='top'>
      <h1>Connect Hub</h1>
      <menu className='nav-button'>
        {currentPath === "/login" || currentPath === "/register" ? (
          <>
            <li>
              <NavLink to='/'>Home</NavLink>
            </li>
          </>
        ) : currentPath === "/users" ? (
          <>
            <li>
              <NavLink to='/messages'>Messages</NavLink>
            </li>
          </>
        ) : currentPath === "/messages" ? (
          <>
            <li>
              <NavLink to='/users'>My Info</NavLink>
            </li>
          </>
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
        ) : (
          <li>
            <NavLink to='/login'>Log In / Register</NavLink>
          </li>
        )}
      </menu>
    </nav>
  );
}
