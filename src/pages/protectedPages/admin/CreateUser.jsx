import { Form, Formik } from "formik";
import TextField from "../../../components/formComponents/TextField";
import * as Yup from "yup";
import SelectField from "../../../components/formComponents/SelectField";

export const CreateUser = () => {
  const addUser = (values) => {};

  return (
    <div className=" min-h-screen  bg-gray-100 px-6 sm:px-12 lg:px-20 pt-24 pb-4 flex flex-col justify-center ">
      <div>
        <h2 className="text-3xl font-bold mb-6 text-center">Add User</h2>

        <div className="flex flex-col justify-center items-center max-w-lg bg-white rounded-lg px-6 md:px-12 m-auto py-4">
          <Formik
            initialValues={{
              email: "",
              username: "",
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
                .required("Please enter the email address"),
              username: Yup.string().required("Please enter the username"),
            })}
            onSubmit={addUser}
          >
            <Form className="w-full flex flex-col justify-center">
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
              <SelectField label="Role" name="role">
                <option value="">Select a role</option>
                <option value="admin">Admin</option>
                <option value="seller">Seller</option>
                <option value="customer">Customer</option>
                <option value="courier">Courier</option>
              </SelectField>

              <button
                aria-label="Login Button"
                type="submit"
                className="w-full bg-purple-500 hover:bg-indigo-700 text-white font-bold text-xl py-1 rounded my-8"
              >
                Login
              </button>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};
