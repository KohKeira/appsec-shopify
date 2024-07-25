import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AppContext from "../../AppContext";

const Courier = () => {
  const { user, setUser } = useContext(AppContext);
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <div className=" min-h-screen bg-gray-100 px-6 sm:px-12 lg:px-20 pt-24">
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
            <tr>
              <td className="border p-2">order no.</td>
              <td className="border p-2">
                <button className="bg-red-400 hover:bg-red-500 p-2 rounded">
                  Complete order
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <h1 className="text-xl lg:text-3xl font-bold bg-clip-text mb-6">
          Pending Orders
        </h1>
        <table className="table-auto border text-left w-full  mb-10">
          <thead>
            <tr>
              <th className="border p-2">Order Number</th>
              <th className="border p-2">Order Status</th>
              <th className="border p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border p-2">order no.</td>
              <td className="border p-2">pending</td>
              <td className="border p-2">
                <button className="bg-yellow-400 hover:bg-yellow-500 p-2 rounded">
                  Accept order
                </button>
              </td>
            </tr>
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
            <tr>
              <td className="border p-2">order no.</td>
              <td className="border p-2">date</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default Courier;
