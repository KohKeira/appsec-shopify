import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AppContext from "../../AppContext";

const Customer = () => {
  const { user, setUser } = useContext(AppContext);
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 ">
      <div className="flex flex-col justify-center items-center text-center w-full max-w-sm bg-white rounded-lg py-8 px-12">
        <h1 className="text-5xl font-bold mb-8  ">Customer</h1>
        <h3 className="text-2xl  mb-8 ">Welcome {user.username}</h3>
        <p className="text-gray-500 text-md text-center mb-8">
          This is the Customer Page. You can buy products.
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
export default Customer;
