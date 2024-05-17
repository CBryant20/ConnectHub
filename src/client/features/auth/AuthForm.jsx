import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useLoginMutation,
  useRegisterMutation,
  useChangePasswordMutation,
} from "./authSlice";

import "./AuthForm.scss";

export default function AuthForm() {
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);
  const [showChangePassword, setShowChangePassword] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newFirstName, setNewFirstName] = useState("");
  const [newLastName, setNewLastName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [login, { isLoading: loginLoading, error: loginError }] =
    useLoginMutation();
  const [register, { isLoading: registerLoading, error: registerError }] =
    useRegisterMutation();
  const [
    changePassword,
    { isLoading: changePasswordLoading, error: changePasswordError },
  ] = useChangePasswordMutation();

  const handleAuthAction = async (evt) => {
    evt.preventDefault();

    const credentials = { email, password };
    const credentials2 = { firstName, lastName, email, password };

    try {
      if (isLogin) {
        await login(credentials).unwrap();
      } else {
        await register(credentials2).unwrap();
      }
      navigate("/messages");
    } catch (err) {
      console.error(err);
    }
  };

  const handleChangePassword = async (evt) => {
    evt.preventDefault();
    try {
      await changePassword({
        firstName: newFirstName,
        lastName: newLastName,
        email: newEmail,
        newPassword,
      }).unwrap();
    } catch (err) {
      console.error(err);
    }
  };

  const handleToggleLogin = () => {
    setIsLogin(!isLogin);
    setShowChangePassword(false);
  };

  return (
    <div className='auth-form'>
      <h1>{isLogin ? "Login" : "Register"}</h1>
      <form className='auth-main' onSubmit={handleAuthAction}>
        {!isLogin && (
          <>
            <div>
              <label>
                First Name
                <input
                  type='text'
                  placeholder='First Name'
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </label>
            </div>
            <div>
              <label>
                Last Name
                <input
                  type='text'
                  placeholder='Last Name'
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </label>
            </div>
          </>
        )}
        <div>
          <label>
            Email
            <input
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Password
            <input
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
        </div>
        <button className='button' type='submit'>
          {isLogin ? "Login" : "Register"}
        </button>
      </form>
      <a className='auth-toggle' onClick={handleToggleLogin}>
        {isLogin ? "Register here" : "Login here"}
      </a>
      {(loginLoading || registerLoading || changePasswordLoading) && (
        <p className='auth-loading'>Please wait...</p>
      )}
      {loginError && (
        <p className='auth-error' role='alert'>
          {loginError.message}
        </p>
      )}
      {registerError && (
        <p className='auth-error' role='alert'>
          {registerError.message}
        </p>
      )}
      {changePasswordError && (
        <p className='auth-error' role='alert'>
          {changePasswordError.message}
        </p>
      )}
      {isLogin && (
        <button className='button' onClick={() => setShowChangePassword(true)}>
          Forgot Password?
        </button>
      )}
      {showChangePassword && (
        <div className='auth-change-password'>
          <h2>Change Password</h2>
          <form className='auth-change' onSubmit={handleChangePassword}>
            <div>
              <label>
                First Name
                <input
                  type='text'
                  placeholder='First Name'
                  value={newFirstName}
                  onChange={(e) => setNewFirstName(e.target.value)}
                />
              </label>
            </div>
            <div>
              <label>
                Last Name
                <input
                  type='text'
                  placeholder='Last Name'
                  value={newLastName}
                  onChange={(e) => setNewLastName(e.target.value)}
                />
              </label>
            </div>
            <div>
              <label>
                Email
                <input
                  type='email'
                  placeholder='Email'
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                />
              </label>
            </div>
            <div>
              <label>
                New Password
                <input
                  type='password'
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </label>
            </div>
            <button className='button' type='submit'>
              Change Password
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
