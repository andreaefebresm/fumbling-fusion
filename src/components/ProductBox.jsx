const ProductBox = ({ product }) => {
    if (!product) return null;
  
    return (
      <div className="bg-white p-6 rounded-2xl shadow space-y-2">
        <h2 className="text-xl font-bold text-[#0C3471]">Recommended product:</h2>
        <p className="text-lg">{product.name}</p>
      </div>
    );
  };
  
  export default ProductBox;
  