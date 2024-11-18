import { useEffect, useState } from "react";
import { ProductCard } from "../components/ProductCard";
import axios from "axios";

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_API}/api/products`)
      .then((res) => {
        setProducts(res.data);
      });
  }, []);

  return (
    <div className="min-h-screen flex justify-center bg-gray-100 py-24">
      <div className="flex flex-col mx-10">
        <h1 className="text-3xl lg:text-5xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-indigo-700 mb-10">
          Welcome to Shopify
        </h1>
        <div className="grid grid-cols-3 gap-6 lg:grid-cols-5">
          {products.map((product) => {
            return <ProductCard product={product} key={product._id} />;
          })}
        </div>
      </div>
    </div>
  );
};
export default Home;
