import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AppContext from "../../AppContext";

const Seller = () => {
  const { user, setUser } = useContext(AppContext);

  return (
    <div className=" min-h-screen  bg-gray-100 px-6 sm:px-12 lg:px-20 pt-24">
      <div className="w-full">
        <h1 className="text-xl lg:text-3xl font-bold bg-clip-text mb-6">
          My Products
        </h1>
        <table className="table-auto border text-left w-full mb-10">
          <thead>
            <tr>
              <th className="border p-2">name</th>
              <th className="border p-2">image</th>
              <th className="border p-2">description</th>
              <th className="border p-2">price</th>
              <th className="border p-2">quantity</th>

              <th className="border p-2">actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border p-2">name</td>
              <td className="border p-2">
                <img
                  src={
                    "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"
                  }
                  alt={"name"}
                  height={100}
                  width={100}
                />
              </td>
              <td className="border p-2">description</td>
              <td className="border p-2">${"price"}</td>
              <td className="border p-2">quantity</td>

              <td className="border p-2">
                <button className="bg-yellow-400 hover:bg-yellow-500 p-2 rounded mr-2">
                  Edit
                </button>
                <button className="bg-red-400 hover:bg-red-500 p-2 rounded">
                  Delete
                </button>
              </td>
            </tr>
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
