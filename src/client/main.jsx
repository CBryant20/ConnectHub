import { createBrowserRouter, RouterProvider } from "react-router-dom";
import React from "react";
import ReactDOM from "react-dom/client";

import "./index.scss";

import { Provider } from "react-redux";
import store from "./store";

import Root from "./layout/Root.jsx";
import Home from "./layout/Home.jsx";
import User from "./features/users/User.jsx";
import AuthForm from "./features/auth/AuthForm";
import Messages from "./features/messages/Messages";
import MessageSelected from "./features/messages/MessageSelected.jsx";

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
