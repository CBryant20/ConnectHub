import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectToken } from "../features/auth/authSlice";

export default function DropDownMenu({ setOpen }) {
  const navigate = useNavigate();
  const location = useLocation();
  const token = useSelector(selectToken);
  const currentPath = location.pathname;

  const handleClick = () => {
    setOpen(false);
  };

  const handleLogout = async () => {
    await dispatch(logout());
    navigate("/");
  };

  return (
    <>
      <div className='drop-nav-button'>
        <menu>
          {currentPath === "/login" || currentPath === "/register" ? (
            <>
              <li>
                <NavLink to='/' onClick={handleClick}>
                  Home
                </NavLink>
              </li>
            </>
          ) : currentPath === "/users" ? (
            <>
              <li>
                <NavLink to='/messages' onClick={handleClick}>
                  Messages
                </NavLink>
              </li>
            </>
          ) : currentPath === "/messages" ? (
            <>
              <li>
                <NavLink to='/users' onClick={handleClick}>
                  My Info
                </NavLink>
              </li>
            </>
          ) : currentPath.startsWith("/messages") ? (
            <>
              <li>
                <NavLink to='/messages' onClick={handleClick}>
                  Messages
                </NavLink>
              </li>
              <li>
                <NavLink to='/users' onClick={handleClick}>
                  My Info
                </NavLink>
              </li>
            </>
          ) : null}
          {token ? (
            <li>
              <a onClick={handleLogout}>Log Out</a>
            </li>
          ) : currentPath !== "/login" && currentPath !== "/register" ? (
            <li>
              <NavLink to='/login' onClick={handleClick}>
                Log In
              </NavLink>
            </li>
          ) : null}
        </menu>
      </div>
    </>
  );
}
