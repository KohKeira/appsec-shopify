import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <div className="text-3xl mb-8">404 Page Not Found</div>
      <Link to="/">
        <button className="w-full text-lg text-white bg-purple-400 hover:bg-indigo-700 py-2 px-4 rounded">
          Go to Home
        </button>
      </Link>
    </div>
  );
};
export default NotFound;
