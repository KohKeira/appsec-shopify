import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import axios from "axios";
import AppContext from "../AppContext";
import TextField from "./formComponents/TextField";
const OTPForm = () => {
  const { setUser, token } = useContext(AppContext);
  const [errors, setErrors] = useState();

  const navigate = useNavigate();

  const submitOTP = (values) => {
    axios
      .post(`${process.env.REACT_APP_BACKEND_API}/api/verify`, values, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        alert(res.data.message);
        setUser(res.data.user);
        navigate(`/${res.data.user.role}`);
      })
      .catch((err) => {
        if (err.response) {
          if (err.response.data.message === "invalid data") {
            setErrors(Object.values(err.response.data.errors).flat().join(" "));
          } else {
            setErrors(err.response.data.message);
          }
        }
      });
  };

  return (
    <div className="flex flex-col justify-center items-center w-full max-w-sm bg-white rounded-lg p-4 md:p-6">
      <h2 className="text-3xl font-bold mb-4">OTP Form</h2>
      <p className="mb-2 self-start">OTP has been sent to your inbox</p>

      {errors && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded w-full">
          {errors}
        </div>
      )}
      <Formik
        initialValues={{
          two_factor_code: "",
        }}
        validationSchema={Yup.object({
          two_factor_code: Yup.number()
            .positive()
            .integer("Please enter a six digit code")
            .required("Please enter the OTP"),
        })}
        onSubmit={submitOTP}
      >
        <Form className="w-full flex flex-col justify-center">
          <TextField
            name="two_factor_code"
            label="OTP"
            type="number"
            placeholder="Enter OTP"
          ></TextField>

          <button
            aria-label="Submit Button"
            type="submit"
            className="w-full bg-purple-500 hover:bg-indigo-700 text-white font-bold text-xl py-1 rounded mt-8"
          >
            Submit OTP
          </button>
        </Form>
      </Formik>
    </div>
  );
};
export default OTPForm;
