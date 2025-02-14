// import { useEffect, useState } from "react";
// import axios from "axios";
// import Style from "../Templates/Layout.module.css";

import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

export default function Layout() {
  return (
    <>
      <Navbar/>
      <Outlet/>
    </>
  )
}
