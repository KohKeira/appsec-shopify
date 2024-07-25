import { Form, Formik } from "formik";
import TextField from "../../../components/formComponents/TextField";
import * as Yup from "yup";
import { TextArea } from "../../../components/formComponents/TextArea";

export const CreateProduct = () => {
  const addProduct = (values) => {};

  return (
    <div className=" min-h-screen  bg-gray-100 px-6 sm:px-12 lg:px-20 pt-24 pb-4">
      <h2 className="text-3xl font-bold mb-6 text-center">Add Product</h2>

      <div className="flex flex-col justify-center items-center max-w-lg bg-white rounded-lg px-6 md:px-12 m-auto py-4">
        <Formik
          initialValues={{
            name: "",
            desc: "",
            price: "",
            quantity: "",
            image: "",
          }}
          validationSchema={Yup.object({
            name: Yup.string().required("Please enter the product name"),
            desc: Yup.string().required("Please enter the product description"),
            price: Yup.number()
              .test(
                "is-decimal",
                "The amount should be a decimal with maximum two digits after comma",
                (value) => (value + "").match(/^\d*\.\d{2,}$/)
              )
              .required("Please enter the product price"),
            quantity: Yup.number()
              .positive()
              .integer("Please enter a whole number")
              .required("Please enter the product quantity"),
            image: Yup.mixed().required("Please select an image"),
          })}
          onSubmit={addProduct}
        >
          <Form className="w-full flex flex-col justify-center">
            <TextField name="name" label="Name" type="text"></TextField>
            <TextArea name="desc" label="Description" type="text"></TextArea>
            <TextField name="price" label="Price" type="number"></TextField>
            <TextField
              name="quantity"
              label="Quantity"
              type="number"
            ></TextField>
            <TextField name="image" label="Image" type="file"></TextField>

            <button
              aria-label="Login Button"
              type="submit"
              className="w-full bg-purple-500 hover:bg-indigo-700 text-white font-bold text-xl py-1 rounded my-8"
            >
              Add
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};
