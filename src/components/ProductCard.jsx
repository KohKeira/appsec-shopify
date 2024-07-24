export const ProductCard = ({ product }) => {
  return (
    <div>
      <img
        src={
          "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"
        }
        alt={product.name}
        height={200}
        width={200}
        className="mb-2"
      />
      <h2 className="text-lg mb-2">{product.name}</h2>
      <p className="text-sm mb-2">${product.price}</p>
      <button className="bg-blue-500 hover:bg-blue-700 text-white p-2 rounded w-full">
        Buy now
      </button>
    </div>
  );
};
