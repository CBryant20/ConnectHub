import React from "react";
import ReactDOM from "react-dom/client";

import "./index.scss";

import { Provider } from "react-redux";
import store from "./store";

import Home from "./layout/Home.jsx";
import AuthForm from "./features/auth/AuthForm";
import Messages from "./features/messages/Messages";
import Root from "./layout/Root.jsx";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/messages", element: <Messages /> },
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
