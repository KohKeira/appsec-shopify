import React, { useContext, useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import axios from "axios";
import AppContext from "../AppContext";
import TextField from "./formComponents/TextField";
import SelectField from "./formComponents/SelectField";
const LoginForm = ({ onToggle, toggleOTPForm, toggleResetForm }) => {
  const { setUser, setToken } = useContext(AppContext);
  const [errors, setErrors] = useState();

  const login = (values) => {
    axios
      .post(`${process.env.REACT_APP_BACKEND_API}/api/login`, values)
      .then((res) => {
        setToken(res.data.token);
        setUser(res.data.user);
        sessionStorage.setItem("token", res.data.token);
        console.log(res.data.code);
        toggleOTPForm();
      })
      .catch((err) => {
        if (err.response) {
          if (err.response.data.errors) {
            console.log(err.response.data.errors);
            setErrors(Object.values(err.response.data.errors).flat().join(" "));
          } else {
            setErrors(err.response.data.message);
          }
        } else {
          setErrors(err.response.data.message);
        }
      });
  };

  return (
    <div className="flex flex-col justify-center items-center w-full max-w-sm bg-white rounded-lg p-4 md:p-6">
      <h2 className="text-3xl font-bold mb-4">Login</h2>
      {errors && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded w-full">
          {errors}
        </div>
      )}
      <Formik
        initialValues={{
          email: "",
          password: "",
          role: "",
        }}
        validationSchema={Yup.object({
          role: Yup.string()
            .oneOf(
              ["admin", "customer", "courier", "seller"],
              "Invalid Job Type"
            )
            .required("Please select a role"),
          email: Yup.string()
            .email("Invalid email address")
            .required("Please enter your email address"),
          password: Yup.string().required("Please enter your password"),
        })}
        onSubmit={login}
      >
        <Form className="w-full flex flex-col justify-center">
          <SelectField label="Role" name="role">
            <option value="">Select a role</option>
            <option value="admin">Admin</option>
            <option value="seller">Seller</option>
            <option value="customer">Customer</option>
            <option value="courier">Courier</option>
          </SelectField>
          <TextField
            name="email"
            label="Email"
            type="email"
            placeholder="example@gmail.com"
          ></TextField>
          <TextField
            name="password"
            label="Password"
            type="password"
          ></TextField>
          <button
            aria-label="Sign Up for an Account Button"
            onClick={toggleResetForm}
            type="button"
            className="appearance-none text-xs underline hover:text-indigo-700 my-2 text-right"
          >
            Forget Password?
          </button>
          <button
            aria-label="Login Button"
            type="submit"
            className="w-full bg-purple-500 hover:bg-indigo-700 text-white font-bold text-xl py-1 rounded mt-6"
          >
            Login
          </button>
        </Form>
      </Formik>

      <button
        aria-label="Sign Up for an Account Button"
        onClick={onToggle}
        className="appearance-none text-xs underline hover:text-indigo-700 mt-6"
      >
        No Account? Sign Up!
      </button>
    </div>
  );
};
export default LoginForm;
