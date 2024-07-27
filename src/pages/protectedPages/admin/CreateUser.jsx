import { Form, Formik } from "formik";
import TextField from "../../../components/formComponents/TextField";
import * as Yup from "yup";
import SelectField from "../../../components/formComponents/SelectField";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import React, { useContext } from "react";
import AppContext from "../../../AppContext";

export const CreateUser = () => {
  const navigate = useNavigate();
  const { token } = useContext(AppContext);

  const addUser = (values) => {
    if (values.password !== values.confirmPassword) {
      console.log("Password and Confirm Password do not match");
      return;
    }
    axios
      .post(`${process.env.REACT_APP_BACKEND_API}/api/admin/users`, values, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        alert(res.data.message);
        navigate("/admin");
      })
      .catch((err) => {
        if (err.response) {
          alert(Object.values(err.response.data.errors).flat().join(" "));
        }
      });
  };

  return (
    <div className=" min-h-screen  bg-gray-100 px-6 sm:px-12 lg:px-20 pt-24 pb-4 flex flex-col justify-center ">
      <div>
        <h2 className="text-3xl font-bold mb-6 text-center">Add User</h2>

        <div className="flex flex-col justify-center items-center max-w-lg bg-white rounded-lg px-6 md:px-12 m-auto py-4">
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
                  ["customer", "courier", "seller", "admin"],
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
                .min(12, "Must be at least 12 characters")
                .matches(/(?=.*[0-9])/, "Password must contain a number")
                .matches(
                  /(?=.*[a-z])/,
                  "Password must contain a lowercase letter"
                )
                .matches(
                  /(?=.*[A-Z])/,
                  "Password must contain a uppercase letter"
                )
                .matches(/(?=.*[!@#$%^&*])/, "Password must contain a symbol")
                .required("Please enter your password"),
              confirmPassword: Yup.string()
                .oneOf([Yup.ref("password"), null], "Passwords must match")
                .required("Please confirm your password"),
            })}
            onSubmit={addUser}
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
                name="username"
                label="Username"
                type="text"
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
                aria-label="Add User Button"
                type="submit"
                className="w-full bg-purple-500 hover:bg-indigo-700 text-white font-bold text-xl py-1 rounded my-8"
              >
                Add User
              </button>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};
