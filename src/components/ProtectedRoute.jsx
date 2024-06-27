import { Outlet, Navigate, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import AppContext from "../AppContext";

const ProtectedRoute = () => {
  const { user } = useContext(AppContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (user) {
      axios
        .get(
          `${process.env.REACT_APP_BACKEND_API}${window.location.pathname}-protected`,
          {
            headers: {
              Authorization: "Bearer " + user.token,
            },
          }
        )
        .then((res) => {
          console.log(res.data);
          // set loading to false when successful
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          if (err.response.status === 401) {
            // redirect to login with wrong role
            navigate("/login", {
              state: { error: "You are not authorized" },
            });
          }
        });
    }
  }, [user, navigate]);
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
  // if loading, do not show anything
  if (loading) return null;
  // allow access to the page with correct token
  return <Outlet />;
};

export default ProtectedRoute;
