import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AppContext from "../../../AppContext";
import axios from "axios";

const Admin = () => {
  const [users, setUsers] = useState([]);
  const { token } = useContext(AppContext);
  const getUsers = () => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_API}/api/admin/users`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        setUsers(res.data);
      });
  };

  const deleteUser = (id) => {
    axios
      .delete(`${process.env.REACT_APP_BACKEND_API}/api/admin/users/${id}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        alert(res.data.message);
        getUsers();
      })
      .catch((err) => {
        if (err.response) {
          alert(err.response.data.message);
        }
      });
  };
  useEffect(() => {
    getUsers();
  }, []);
  return (
    <div className=" min-h-screen bg-gray-100 px-6 sm:px-12 lg:px-20 pt-24">
      <div className="w-full">
        <h1 className="text-xl lg:text-3xl font-bold bg-clip-text mb-6">
          Users
        </h1>
        <Link to={"/admin/user"}>
          <button className="bg-blue-300 hover:bg-blue-500 p-2 rounded mb-4">
            Add
          </button>
        </Link>

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
            {users.map((user) => {
              return (
                <tr key={user._id}>
                  <td className="border p-2">{user.username}</td>
                  <td className="border p-2">{user.email}</td>
                  <td className="border p-2">{user.role}</td>
                  <td className="border p-2">
                    <button
                      className="bg-red-400 hover:bg-red-500 p-2 rounded"
                      onClick={() => deleteUser(user._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default Admin;
