import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AppContext from "../../AppContext";
import axios from "axios";

const Courier = () => {
  const { token } = useContext(AppContext);
  const [orders, setOrders] = useState([]);
  const [pendingDeliveries, setPendingDeliveries] = useState([]);
  const [completedDeliveries, setCompletedDeliveries] = useState([]);

  const getOrders = () => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_API}/api/courier/pendingOrders`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        setOrders(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getDelveries = () => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_API}/api/courier/deliveries`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        setPendingDeliveries(
          res.data.filter((delivery) => delivery.status === "pending")
        );
        setCompletedDeliveries(
          res.data.filter((delivery) => delivery.status === "completed")
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const acceptOrder = (id) => {
    axios
      .post(
        `${process.env.REACT_APP_BACKEND_API}/api/courier/deliveries`,
        { order_id: id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        alert(res.data.message);
        getOrders();
        getDelveries();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const completeOrder = (id) => {
    console.log(id);
    axios
      .put(
        `${process.env.REACT_APP_BACKEND_API}/api/courier/deliveries/` + id,
        {},
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((res) => {
        alert(res.data.message);
        getOrders();
        getDelveries();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getOrders();
    getDelveries();
  }, []);
  return (
    <div className=" min-h-screen bg-gray-100 px-6 sm:px-12 lg:px-20 py-24">
      <div className="w-full">
        <h1 className="text-xl lg:text-3xl font-bold bg-clip-text my-6">
          Pending Deliveries
        </h1>
        <table className="table-auto border text-left w-full  mb-10">
          <thead>
            <tr>
              <th className="border p-2">Order Number</th>
              <th className="border p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {pendingDeliveries.map((delivery) => {
              return (
                <tr key={delivery._id}>
                  <td className="border p-2">{delivery.order_id}</td>
                  <td className="border p-2">
                    <button
                      className="bg-red-400 hover:bg-red-500 p-2 rounded"
                      onClick={() => completeOrder(delivery._id)}
                    >
                      Complete order
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <h1 className="text-xl lg:text-3xl font-bold bg-clip-text mb-6">
          Pending Orders
        </h1>
        <table className="table-auto border text-left w-full  mb-10">
          <thead>
            <tr>
              <th className="border p-2">Order Number</th>
              <th className="border p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => {
              return (
                <tr key={order._id}>
                  <td className="border p-2">{order._id}</td>
                  <td className="border p-2">
                    <button
                      className="bg-yellow-400 hover:bg-yellow-500 p-2 rounded"
                      onClick={() => acceptOrder(order._id)}
                    >
                      Accept order
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <h1 className="text-xl lg:text-3xl font-bold bg-clip-text mb-6">
          Completed Deliveries
        </h1>

        <table className="table-auto border text-left w-full  mb-10">
          <thead>
            <tr>
              <th className="border p-2">Order Number</th>
              <th className="border p-2">Completed Date</th>
            </tr>
          </thead>
          <tbody>
            {completedDeliveries.map((delivery) => {
              return (
                <tr key={delivery._id}>
                  <td className="border p-2">{delivery.order_id}</td>
                  <td className="border p-2">{Date(delivery.updated_at)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default Courier;
