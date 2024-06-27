import React, { useState } from "react";
import axios from "axios";
const SignUpForm = ({ onToggle }) => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    role: "admin",
    confirmPassword: "",
  });

  const signUp = async (e) => {
    e.preventDefault();
    if (values.password !== values.confirmPassword) {
      console.log("Password and Confirm Password do not match");
      return;
    }
    axios
      .post(
        `${process.env.REACT_APP_BACKEND_API}/register-${values.role}`,
        values
      )
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="flex flex-col justify-center items-center w-full max-w-sm bg-white rounded-lg py-8 px-12">
      <h2 className="text-3xl font-bold mb-4">Sign Up</h2>
      <form action="" className="w-full">
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
            <option value="admin">Admin</option>{" "}
            <option value="seller">Seller</option>
            <option value="customer">Customer</option>
            <option value="courier">Courier</option>
          </select>
        </div>
        <div className="mb-4 w-full">
          <label
            htmlFor="username"
            className="block mb-1 font-medium	text-gray-700"
          >
            Username
          </label>
          <input
            type="text"
            placeholder="Username"
            required
            onChange={(e) => setValues({ ...values, username: e.target.value })}
            className="block w-full border rounded shadow py-1 px-2 focus:outline-none focus:border-blue-300"
          />
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
        <div className="mb-4 w-full">
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
        <div className="mb-4 w-full">
          <label
            htmlFor="confirmPassword"
            className="block mb-1 font-medium	 text-gray-700"
          >
            Confirm Password
          </label>
          <input
            type="password"
            placeholder="Confirm Password"
            required
            onChange={(e) =>
              setValues({ ...values, confirmPassword: e.target.value })
            }
            className="block w-full border rounded shadow py-1 px-2 focus:outline-none focus:border-blue-300"
          />
        </div>
        <button
          onClick={signUp}
          className="w-full bg-purple-400 hover:bg-indigo-700 text-white font-bold py-1 rounded mt-4"
        >
          Sign Up
        </button>
      </form>
      <button
        onClick={onToggle}
        className="appearance-none text-xs underline hover:text-indigo-700 mt-6"
      >
        Have Account? Sign In!
      </button>
    </div>
  );
};
export default SignUpForm;
