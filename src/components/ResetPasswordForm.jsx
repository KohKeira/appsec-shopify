import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import axios from "axios";
import TextField from "./formComponents/TextField";
const ResetPasswordForm = ({ toggleResetPasswordForm }) => {
  const [errors, setErrors] = useState();

  const resetPassword = (values) => {
    axios
      .post(
        `${process.env.REACT_APP_BACKEND_API}/api/resetPassword/check`,
        values
      )
      .then((res) => {
        console.log(res.data);
        alert(res.data.message);
        toggleResetPasswordForm();
      })
      .catch((err) => {
        if (err.response.status === 400) {
          if (err.response.data.errors) {
            setErrors(Object.values(err.response.data.errors).flat().join(" "));
          } else {
            setErrors(err.response.data.message);
          }
        }
        // otp expired
        if (err.response.status === 401) {
          alert(err.response.data.message);
          toggleResetPasswordForm();
        }
        setErrors(err.response.data.message);
      });
  };

  return (
    <div className="flex flex-col justify-center items-center w-full max-w-sm bg-white rounded-lg p-4 md:p-6">
      <h2 className="text-3xl font-bold mb-4">Reset Password</h2>

      {errors && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded w-full">
          {errors}
        </div>
      )}
      <Formik
        initialValues={{
          email: "",
          password: "",
          code: "",
          password_confirmation: "",
        }}
        validationSchema={Yup.object({
          email: Yup.string()
            .email("Invalid email address")
            .required("Please enter your email address"),
          code: Yup.number()
            .positive()
            .integer("Please enter a six digit code")
            .required("Please enter the OTP"),
          password: Yup.string()
            .min(12, "Must be at least 12 characters")
            .matches(/(?=.*[0-9])/, "Password must contain a number")
            .matches(/(?=.*[a-z])/, "Password must contain a lowercase letter")
            .matches(/(?=.*[A-Z])/, "Password must contain a uppercase letter")
            .matches(/(?=.*[!@#$%^&*])/, "Password must contain a symbol")
            .required("Please enter your password"),
          password_confirmation: Yup.string()
            .oneOf([Yup.ref("password"), null], "Passwords must match")
            .required("Please confirm your password"),
        })}
        onSubmit={resetPassword}
      >
        <Form className="w-full flex flex-col justify-center">
          <TextField name="code" label="Code" type="number"></TextField>
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
            name="password_confirmation"
            label="Confirm Password"
            type="password"
          ></TextField>
          <button
            aria-label="Reset Password Button"
            type="submit"
            className="w-full bg-purple-500 hover:bg-indigo-700 text-white font-bold text-xl py-1 rounded mt-6"
          >
            Reset Password
          </button>
        </Form>
      </Formik>
    </div>
  );
};
export default ResetPasswordForm;
