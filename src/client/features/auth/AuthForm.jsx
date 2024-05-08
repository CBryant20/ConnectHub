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

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newFullName, setNewFullName] = useState("");
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
    const credentials2 = { fullName, email, password };

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

  const handleChangePassword = async () => {
    try {
      await changePassword({
        fullName: newFullName,
        newEmail,
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
          <div>
            <label>
              Full Name
              <input
                type='text'
                placeholder='First Name Last Name'
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </label>
          </div>
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
          {loginError}
        </p>
      )}
      {registerError && (
        <p className='auth-error' role='alert'>
          {registerError}
        </p>
      )}
      {changePasswordError && (
        <p class='auth-error' role='alert'>
          {changePasswordError}
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
                Full Name
                <input
                  type='text'
                  placeholder='First name Last name'
                  value={newFullName}
                  onChange={(e) => setNewFullName(e.target.value)}
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
