import { Outlet, Navigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import axios from "axios";
import AppContext from "../AppContext";

const ProtectedRoute = () => {
  const { user } = useContext(AppContext);
  if (!user) {
    console.log("Not logged in. Redirecting to login page");

    return (
      <Navigate
        to="/login"
        state={{ error: "You need to be logged in to access this page" }}
      />
    );
  }
  console.log(user);

  axios
    .get(`${process.env.REACT_APP_BACKEND_API}/${user.role}-protected`, {
      headers: {
        Authorization: "Bearer " + user.token,
      },
    })
    .then((res) => {
      console.log(res.data);
    });
  // check if user is logged in

  return <Outlet />;
};

export default ProtectedRoute;
