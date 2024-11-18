import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AppContext from "../../AppContext";
import axios from "axios";

const Customer = () => {
  const { token } = useContext(AppContext);
  const [orders, setOrders] = useState([]);
  const getOrders = () => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_API}/api/customer/orders`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        setOrders(res.data);
      });
  };
  useEffect(() => {
    getOrders();
  }, []);

  const deleteOrder = (id) => {
    axios
      .delete(
        `${process.env.REACT_APP_BACKEND_API}/api/customer/orders/${id}`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((res) => {
        alert(res.data.message);
        getOrders();
      })
      .catch((err) => {
        if (err.response) {
          alert(err.response.data.message);
        }
      });
  };

  return (
    <div className=" min-h-screen  bg-gray-100 px-6 sm:px-12 lg:px-20 py-24">
      <div className="w-full">
        <h1 className="text-xl lg:text-3xl font-bold bg-clip-text mb-6">
          My Orders
        </h1>
        <table className="table-auto border text-left w-full mb-10">
          <thead>
            <tr>
              <th className="border p-2">Product</th>
              <th className="border p-2">Price</th>
              <th className="border p-2">Order Status</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => {
              return (
                <tr key={order._id}>
                  <td className="border p-2">{order.product.name}</td>
                  <td className="border p-2">${order.product.price}</td>
                  <td className="border p-2">{order.status}</td>
                  {order.status === "pending" && (
                    <td className="border p-2">
                      <button
                        className="bg-red-400 hover:bg-red-500 p-2 rounded"
                        onClick={() => deleteOrder(order._id)}
                      >
                        Delete
                      </button>
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>

        <Link to="/" className="underline hover:text-indigo-500">
          <h2 className="lg:text-lg font-bold mt-10">
            See all products available
          </h2>
        </Link>
      </div>
    </div>
  );
};
export default Customer;
