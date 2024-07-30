import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AppContext from "../AppContext";
import React, { useState } from "react";
import axios from "axios";

export const Navbar = () => {
  const { user, setUser, setToken, token } = useContext(AppContext);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleNavbar = () => {
    setIsOpen((prev) => !prev);
  };

  const logout = () => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_API}/api/logout`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setUser();
        setToken();
        alert(res.data.message);
        sessionStorage.removeItem("token");
        navigate("/");
      })
      .catch((err) => {
        if (err.response) {
          alert(err.response.data.message);
        }
      });
  };
  return (
    <nav className="bg-white dark:bg-gray-900 fixed w-full">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-2 px-4">
        <Link to="/" className="text-2xl">
          Shopify
        </Link>
        <button
          onClick={toggleNavbar}
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div
          className={` mb-2 w-full md:block md:w-auto ${
            isOpen ? "" : "hidden"
          }`}
          id="navbar-default"
        >
          <ul className="font-medium flex flex-col md:flex-row md:gap-4 mt-4 p-0">
            {!user && (
              <li className="block text-gray-900 rounded hover:text-purple-600">
                <Link to={"/login"}>Login</Link>
              </li>
            )}
            {user && (
              <>
                <li>
                  <Link
                    to={`/${user.role}`}
                    className="block text-gray-900 rounded hover:text-purple-600"
                  >
                    {user.role[0].toUpperCase() + user.role.slice(1)}
                  </Link>
                </li>
                <li
                  className="block text-gray-900 rounded hover:text-purple-600 cursor-pointer"
                  onClick={logout}
                >
                  Logout
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};
