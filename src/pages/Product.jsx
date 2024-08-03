import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AppContext from "../AppContext";
const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const { token, user } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_API}/api/products/${id}`)
      .then((res) => {
        setProduct(res.data);
      });
  }, [id]);

  const buyProduct = () => {
    if (!window.confirm("Do want to buy this product?")) {
      return;
    }
    if (!token) {
      alert("Please login to buy this product");
      navigate("/login");
      return;
    }
    if (user && user.role !== "customer") {
      alert("You are not authorized to make a purchase");
      navigate("/login");
      return;
    }
    axios
      .post(
        `${process.env.REACT_APP_BACKEND_API}/api/customer/orders`,
        { product_id: id },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((res) => {
        alert(res.data.message);
        navigate("/customer");
      })
      .catch((err) => {
        if (err.response) {
          alert(err.response.data.message);
        }
      });
  };
  return (
    <div className="min-h-screen bg-gray-100 px-6 sm:px-12 lg:px-20 pt-24 ">
      <h1 className="text-2xl lg:text-4xl font-bold bg-clip-text mb-6">
        {product.name}
      </h1>
      <div className="flex w-full flex-col md:flex-row">
        <img
          src={process.env.REACT_APP_BACKEND_API + product.image}
          alt={product.name}
          className="max-h-80 max-w-md lg:max-w-lg mr-8"
        />
        <div className="">
          <h2 className="text-xl mb-4">
            Description: <br />
            {product.desc}
          </h2>
          <p className="mb-4">Price: ${product.price}</p>
          <p className="mb-4">Quantity: {product.quantity}</p>
          {product.quantity > 0 && (
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white p-2 rounded"
              onClick={buyProduct}
            >
              Buy now
            </button>
          )}
          {product.quantity === 0 && (
            <button
              className="bg-gray-300 text-black p-2 rounded"
              disabled={true}
            >
              Out of Stock
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
export default Product;
