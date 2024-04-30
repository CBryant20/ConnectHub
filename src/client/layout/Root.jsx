import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

import "./Root.scss";

export default function Root() {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </>
  );
}
