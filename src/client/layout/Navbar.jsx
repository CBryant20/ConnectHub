import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { logout, selectToken } from "../features/auth/authSlice";

import "./Navbar.scss";

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const token = useSelector(selectToken);

  const handleLogout = async () => {
    await dispatch(logout());
    navigate("/");
  };

  return (
    <nav className='top'>
      <h1>Connect Hub</h1>
      <menu>
        {location.pathname === "/login" || location.pathname === "/register" ? (
          <li>
            <NavLink to='/'>Home</NavLink>
          </li>
        ) : location.pathname !== "/" && location.pathname !== "/users" ? (
          <li>
            <NavLink to='/users'>My Info</NavLink>
          </li>
        ) : location.pathname !== "/messages" && location.pathname !== "/" ? (
          <li>
            <NavLink to='/messages'>Messages</NavLink>
          </li>
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
