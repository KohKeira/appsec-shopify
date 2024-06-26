import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AppContext from "../AppContext";
const LoginForm = ({ onToggle }) => {
  const { user, setUser } = useContext(AppContext);

  const navigate = useNavigate();

  const [values, setValues] = useState({
    email: "",
    password: "",
    role: "admin",
  });

  const login = async (e) => {
    e.preventDefault();
    axios
      .post(`${process.env.REACT_APP_BACKEND_API}/login-${values.role}`, values)
      .then((res) => {
        setUser(res.data);
        localStorage.setItem("user", JSON.stringify(res.data));
        navigate(`/protected/${res.data.role}`);
      })
      .catch((err) => {
        if (err.response) {
          alert(err.response.data.message);
        }
      });
  };

  return (
    <div className="flex flex-col justify-center items-center w-full max-w-sm bg-white rounded-lg py-8 px-12">
      <h2 className="text-3xl font-bold mb-6">Login</h2>
      <form
        action=""
        className="w-full flex flex-col justify-center items-center "
      >
        <div className="mb-4 w-full">
          <label htmlFor="role" className="block mb-1 font-medium	text-gray-700">
            Role
          </label>
          <select
            name="role"
            id="role"
            onChange={(e) => setValues({ ...values, role: e.target.value })}
            className="block w-full border rounded shadow py-1 px-2 focus:outline-none focus:border-blue-300"
          >
            <option value="admin">Admin</option>
            <option value="seller">Seller</option>
            <option value="customer">Customer</option>
            <option value="courier">Courier</option>
          </select>
        </div>
        <div className="mb-4 w-full">
          <label
            htmlFor="email"
            className="block mb-1 font-medium	text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            placeholder="Email"
            required
            onChange={(e) => setValues({ ...values, email: e.target.value })}
            className="block w-full border rounded shadow py-1 px-2 focus:outline-none focus:border-blue-300"
          />
        </div>
        <div className="mb-1 w-full">
          <label
            htmlFor="password"
            className="block mb-1 font-medium	 text-gray-700"
          >
            Password
          </label>
          <input
            type="password"
            placeholder="Password"
            required
            onChange={(e) => setValues({ ...values, password: e.target.value })}
            className="block w-full border rounded shadow py-1 px-2 focus:outline-none focus:border-blue-300"
          />
        </div>
        <button className="appearance-none text-xs hover:text-indigo-700 mb-4 self-end">
          Forget Password?
        </button>
        <button
          onClick={login}
          className="w-full bg-purple-400 hover:bg-indigo-700 text-white font-bold py-1 rounded mt-4"
        >
          Login
        </button>
      </form>
      <button
        onClick={onToggle}
        className="appearance-none text-xs underline hover:text-indigo-700 mt-6"
      >
        No Account? Sign Up!
      </button>
    </div>
  );
};
export default LoginForm;
