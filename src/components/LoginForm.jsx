import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import axios from "axios";
import AppContext from "../AppContext";
import TextField from "./formComponents/TextField";
import SelectField from "./formComponents/SelectField";
const LoginForm = ({ onToggle }) => {
  const { setUser } = useContext(AppContext);

  const navigate = useNavigate();

  const login = (values) => {
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
      <h2 className="text-3xl font-bold mb-4">Login</h2>
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
            .required("Required"),
          email: Yup.string()
            .email("Invalid email address")
            .required("Required"),
          password: Yup.string().required("Required"),
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
          <button className="appearance-none text-xs hover:text-indigo-700 mb-4 mt-1 self-end">
            Forget Password?
          </button>
          <button
            type="submit"
            className="w-full bg-purple-400 hover:bg-indigo-700 text-white font-bold py-1 rounded mt-4"
          >
            Login
          </button>
        </Form>
      </Formik>

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
