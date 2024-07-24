import { Link } from "react-router-dom";
import { useContext } from "react";
import AppContext from "../AppContext";
import { ProductCard } from "../components/ProductCard";

const Home = () => {
  const { user } = useContext(AppContext);
  const product = {
    name: "Shirt",
    price: 100,
    image: "https://via.placeholder.com/150",
    description: "This is a shirt",
  };

  return (
    <div className="min-h-screen flex justify-center bg-gray-100 pt-24">
      <div className="flex flex-col max-w-lg mx-10">
        <h1 className="text-3xl lg:text-5xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-indigo-700 mb-10">
          Welcome to Shopify
        </h1>
        <div className="grid grid-cols-3 gap-6">
          <ProductCard product={product} />
          <ProductCard product={product} />
          <ProductCard product={product} />
          <ProductCard product={product} />
        </div>
      </div>
    </div>
  );
};
export default Home;
