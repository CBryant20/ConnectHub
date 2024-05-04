import React from "react";
import ReactDOM from "react-dom/client";

import "./index.scss";

import { Provider } from "react-redux";
import store from "./store";

import User from "./features/users/Users.jsx";
import Home from "./layout/Home.jsx";
import AuthForm from "./features/auth/AuthForm";
import Messages from "./features/messages/Messages";
import MessageSelected from "./features/messages/MessageSelected.jsx";
import Root from "./layout/Root.jsx";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/users", element: <User /> },
      { path: "/messages", element: <Messages /> },
      { path: "/messages/:messageId", element: <MessageSelected /> },
      { path: "/login", element: <AuthForm /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
