import React from "react";
import axios from "axios";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import TextField from "./formComponents/TextField";
import SelectField from "./formComponents/SelectField";
import { useNavigate } from "react-router-dom";

const SignUpForm = ({ onToggle }) => {
  const navigate = useNavigate();
  const signUp = (values) => {
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
        alert(res.data.message);
        onToggle();
      })
      .catch((err) => {
        if (err.response) {
          alert(err.response.data.message.join("\n"));
        }
      });
  };

  return (
    <div className="flex flex-col justify-center items-center w-full max-w-sm bg-white rounded-lg py-8 px-12">
      <h2 className="text-3xl font-bold mb-4">Sign Up</h2>
      <Formik
        initialValues={{
          email: "",
          password: "",
          role: "",
          username: "",
          confirmPassword: "",
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
          username: Yup.string()
            .min(5, "Must be at least 5 characters")
            .required("Please enter your username"),
          password: Yup.string()
            .min(8, "Must be at least 8 characters")
            .matches(/(?=.*[0-9])/, "Password must contain a number")
            .matches(/(?=.*[a-z])/, "Password must contain a lowercase letter")
            .matches(/(?=.*[A-Z])/, "Password must contain a uppercase letter")
            .required("Please enter your password"),
          confirmPassword: Yup.string()
            .oneOf([Yup.ref("password"), null], "Passwords must match")
            .required("Please confirm your password"),
        })}
        onSubmit={signUp}
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
            name="username"
            label="Username"
            type="username"
            placeholder="johnDoe"
          ></TextField>
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
          <TextField
            name="confirmPassword"
            label="Confirm Password"
            type="password"
          ></TextField>

          <button
            type="submit"
            className="w-full bg-purple-400 hover:bg-indigo-700 text-white font-bold py-1 rounded mt-8"
          >
            Sign Up
          </button>
        </Form>
      </Formik>
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
