import { Link } from "react-router-dom";

export const ProductCard = ({ product }) => {
  return (
    <div className="h-full flex flex-col">
      <img
        src={process.env.REACT_APP_BACKEND_API + product.image}
        alt={product.name}
        className="mb-2 max-h-44"
      />
      <h2 className="text-lg mb-2">{product.name}</h2>
      <p className="text-sm mb-auto">${product.price}</p>
      <Link to={`product/${product._id}`}>
        <button className="bg-blue-500 hover:bg-blue-700 text-white p-2 rounded w-full mt-2">
          View
        </button>
      </Link>
    </div>
  );
};
