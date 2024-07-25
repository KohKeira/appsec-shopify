import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AppContext from "../../../AppContext";
import axios from "axios";

const Seller = () => {
  const { token } = useContext(AppContext);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_API}/api/products`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const deleteProduct = (id) => {};
  return (
    <div className=" min-h-screen  bg-gray-100 px-6 sm:px-12 lg:px-20 pt-24">
      <div className="w-full">
        <h1 className="text-xl lg:text-3xl font-bold bg-clip-text mb-6">
          My Products
        </h1>
        <Link to={"/seller/product"}>
          <button className="bg-blue-300 hover:bg-blue-500 p-2 rounded mb-4">
            Add
          </button>
        </Link>

        <table className="table-auto border text-left w-full mb-10">
          <thead>
            <tr>
              <th className="border p-2">Name</th>
              <th className="border p-2">Image</th>
              <th className="border p-2">Description</th>
              <th className="border p-2">price</th>
              <th className="border p-2">Quantity</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => {
              return (
                <tr key={product._id}>
                  <td className="border p-2">{product.name}</td>
                  <td className="border p-2">
                    <img
                      src={process.env.REACT_APP_BACKEND_API + product.image}
                      alt={product.name}
                      height={70}
                      width={70}
                    />
                  </td>
                  <td className="border p-2">{product.desc}</td>
                  <td className="border p-2">${product.price}</td>
                  <td className="border p-2">{product.quantity}</td>

                  <td className="border p-2">
                    <Link to={"/seller/product/" + product._id}>
                      <button className="bg-yellow-400 hover:bg-yellow-500 p-2 rounded mr-2">
                        Edit
                      </button>
                    </Link>

                    <button
                      className="bg-red-400 hover:bg-red-500 p-2 rounded"
                      onClick={() => deleteProduct(product._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <h1 className="text-xl lg:text-3xl font-bold bg-clip-text mb-6">
          Orders
        </h1>
        <table className="table-auto border text-left w-full">
          <thead>
            <tr>
              <th className="border p-2">user</th>
              <th className="border p-2">product</th>
              <th className="border p-2">status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border p-2">name</td>

              <td className="border p-2">product</td>
              <td className="border p-2">statusyou</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default Seller;
