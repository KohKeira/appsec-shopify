import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AppContext from "../../AppContext";

const Admin = () => {
  const { user, setUser } = useContext(AppContext);

  return (
    <div className=" min-h-screen bg-gray-100 px-6 sm:px-12 lg:px-20 pt-24">
      <div className="w-full">
        <h1 className="text-xl lg:text-3xl font-bold bg-clip-text mb-6">
          Users
        </h1>
        <button className="bg-blue-300 hover:bg-blue-500 p-2 rounded mb-4">
          Add
        </button>
        <table className="table-auto border text-left w-full">
          <thead>
            <tr>
              <th className="border p-2">Username</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Role</th>
              <th className="border p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border p-2">Username</td>
              <td className="border p-2">Email</td>
              <td className="border p-2">Role</td>
              <td className="border p-2">
                <button className="bg-red-400 hover:bg-red-500 p-2 rounded">
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default Admin;
