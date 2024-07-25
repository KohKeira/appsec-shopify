import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_API}/api/products/${id}`)
      .then((res) => {
        setProduct(res.data);
        console.log(res.data);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 px-6 sm:px-12 lg:px-20 pt-24 ">
      <h1 className="text-2xl lg:text-4xl font-bold bg-clip-text mb-6">
        {product.name}
      </h1>
      <div className="flex w-full flex-col lg:flex-row">
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
          <button className="bg-blue-500 hover:bg-blue-700 text-white p-2 rounded">
            Buy now
          </button>
        </div>
      </div>
    </div>
  );
};
