import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AppContext from "../../AppContext";

const Courier = () => {
  const { user, setUser } = useContext(AppContext);
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-6 sm:px-8 lg:px-16">
      <div className="flex flex-col justify-center items-center text-center w-full max-w-sm lg:max-w-md bg-white rounded-lg p-8 lg:p-12">
        <h1 className="text-3xl font-bold mb-8 lg:text-5xl">Courier Page</h1>
        <h3 className="text-xl mb-8 lg:text-3xl ">Welcome {user.username}</h3>
        <p className="text-gray-500 text-md text-center mb-8">
          This is the Courier Page. You can get delivery jobs.
        </p>
        <Link
          onClick={logout}
          to="/login"
          className="text-sm underline hover:text-indigo-700"
        >
          Logout
        </Link>
      </div>
    </div>
  );
};
export default Courier;
