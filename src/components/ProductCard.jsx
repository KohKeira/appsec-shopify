import { Link } from "react-router-dom";

export const ProductCard = ({ product }) => {
  return (
    <div>
      <img
        src={process.env.REACT_APP_BACKEND_API + product.image}
        alt={product.name}
        height={200}
        width={200}
        className="mb-2"
      />
      <h2 className="text-lg mb-2">{product.name}</h2>
      <p className="text-sm mb-2">${product.price}</p>
      <Link to={`product/${product._id}`}>
        <button className="bg-blue-500 hover:bg-blue-700 text-white p-2 rounded w-full">
          Buy now
        </button>
      </Link>
    </div>
  );
};
