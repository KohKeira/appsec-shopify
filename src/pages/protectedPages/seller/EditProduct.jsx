import { Form, Formik } from "formik";
import TextField from "../../../components/formComponents/TextField";
import * as Yup from "yup";
import { TextArea } from "../../../components/formComponents/TextArea";
import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import FileUpload from "../../../components/formComponents/FileUpload";
import AppContext from "../../../AppContext";

export const EditProduct = () => {
  const { token } = useContext(AppContext);
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const fileInput = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_API}/api/products/${id}`)
      .then((res) => {
        setProduct(res.data);
      });
  }, []);
  const editProduct = (values) => {
    const image = fileInput?.current?.files[0];
    console.log(values.name);
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("desc", values.desc);
    formData.append("price", values.price);
    formData.append("quantity", values.quantity);
    formData.append("_method", "put");
    if (image) {
      formData.append("image", image);
    } else {
      console.log("No file selected");
    }

    axios
      .post(
        `${process.env.REACT_APP_BACKEND_API}/api/seller/products/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        alert(res.data.message);
        navigate("/seller");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className=" min-h-screen  bg-gray-100 px-6 sm:px-12 lg:px-20 pt-24 pb-4">
      <h2 className="text-3xl font-bold mb-6 text-center">Edit Product</h2>

      <div className="flex flex-col justify-center items-center max-w-lg bg-white rounded-lg px-6 md:px-12 m-auto py-4">
        <Formik
          enableReinitialize={true}
          initialValues={{
            name: product?.name ?? "",
            desc: product?.desc ?? "",
            price: product?.price ?? "",
            quantity: product?.quantity ?? "",
            image: "",
          }}
          validationSchema={Yup.object({
            name: Yup.string().min(5).required("Please enter the product name"),
            desc: Yup.string()
              .max(255)
              .required("Please enter the product description"),
            price: Yup.number()
              .test(
                "is-decimal",
                "The amount should be a decimal with maximum two digits after comma",
                (value) => (value + "").match(/^\d+(\.\d{1,2})?$/)
              )
              .required("Please enter the product price"),
            quantity: Yup.number()
              .positive()
              .integer("Please enter a whole number")
              .required("Please enter the product quantity"),
            image: Yup.mixed().optional(),
          })}
          onSubmit={editProduct}
        >
          {({ setFieldValue }) => (
            <Form className="w-full flex flex-col justify-center">
              <TextField name="name" label="Name" type="text"></TextField>
              <TextArea name="desc" label="Description" type="text"></TextArea>
              <TextField
                name="price"
                label="Price"
                type="number"
                step="0.01"
              ></TextField>
              <TextField
                name="quantity"
                label="Quantity"
                type="number"
              ></TextField>
              <FileUpload
                name="image"
                label={"(optional)"}
                fileRef={fileInput}
              ></FileUpload>
              <button
                aria-label="Login Button"
                type="submit"
                className="w-full bg-purple-500 hover:bg-indigo-700 text-white font-bold text-xl py-1 rounded my-8"
              >
                Edit
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
