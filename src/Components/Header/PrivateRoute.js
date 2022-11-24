import { Navigate, Outlet } from "react-router-dom";

import React from "react";

const userLogin = JSON.parse(localStorage.getItem("login"));
export default function PrivateRoute() {
  let login = [...userLogin];

  return(
login.length !== 0 ? <Outlet /> : <Navigate to="/"/>
  )
}
