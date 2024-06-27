import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen flex justify-center bg-gray-100">
      <div className="flex flex-col justify-center items-center max-w-lg mx-10">
        <h1 className="text-3xl lg:text-5xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-indigo-700 mb-10">
          Welcome to Shopify
        </h1>
        <h3 className="text-xl large:text-3xl font-medium text-center mb-8">
          You can sell, buy and earn delivery commission on this platform
        </h3>
        <Link to="/login">
          <button className="w-full text-lg text-white bg-purple-400 hover:bg-indigo-700 py-2 px-4 rounded">
            Login to continue
          </button>
        </Link>
      </div>
    </div>
  );
};
export default Home;
