import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useLoginMutation,
  useRegisterMutation,
  useChangePasswordMutation,
} from "./authSlice";

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
        newPassword,
      }).unwrap();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <h1>{isLogin ? "Login" : "Register"}</h1>
      <form onSubmit={handleAuthAction}>
        {!isLogin && (
          <label>
            Full Name
            <input
              type='text'
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              autoComplete='fullName'
            />
          </label>
        )}
        <label>
          Email
          <input
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete='current-email'
          />
        </label>
        <label>
          Password
          <input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete='current-password'
          />
        </label>
        <button type='submit'>{isLogin ? "Login" : "Register"}</button>
      </form>
      <a onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? "Register here" : "Login here"}
      </a>

      {(loginLoading || registerLoading || changePasswordLoading) && (
        <p>Please wait...</p>
      )}
      {loginError && <p role='alert'>{loginError}</p>}
      {registerError && <p role='alert'>{registerError}</p>}
      {changePasswordError && <p role='alert'>{changePasswordError.message}</p>}

      {isLogin && (
        <button onClick={() => setShowChangePassword(true)}>
          Forgot Password?
        </button>
      )}

      {showChangePassword && (
        <>
          <h2>Change Password</h2>
          <form onSubmit={handleChangePassword}>
            <label>
              Full Name
              <input
                type='text'
                value={newFullName}
                onChange={(e) => setNewFullName(e.target.value)}
                autoComplete='fullName'
              />
            </label>
            <label>
              New Password
              <input
                type='password'
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </label>
            <button type='submit'>Change Password</button>
          </form>
          {changePasswordLoading && <p>Please wait...</p>}
        </>
      )}
    </>
  );
}
