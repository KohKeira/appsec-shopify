import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import axios from "axios";
import TextField from "./formComponents/TextField";
const EmailForm = ({ toggleResetPasswordForm, toggleResetForm }) => {
  const [errors, setErrors] = useState();

  const sendEmail = (values) => {
    axios
      .post(
        `${process.env.REACT_APP_BACKEND_API}/api/resetPassword/send`,
        values
      )
      .then((res) => {
        alert(res.data.message);
        console.log(res.data.code);
        toggleResetForm();
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
        }}
        validationSchema={Yup.object({
          email: Yup.string()
            .email("Invalid email address")
            .required("Please enter your email address"),
        })}
        onSubmit={sendEmail}
      >
        <Form className="w-full flex flex-col justify-center">
          <TextField
            name="email"
            label="Email"
            type="email"
            placeholder="example@gmail.com"
          ></TextField>

          <button
            aria-label="Reset email link Button"
            type="submit"
            className="w-full bg-purple-500 hover:bg-indigo-700 text-white font-bold text-xl py-1 rounded mt-6"
          >
            Send Email
          </button>
        </Form>
      </Formik>
    </div>
  );
};
export default EmailForm;
