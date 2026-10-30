import { Link } from "react-router-dom";

const BestSingleProduct = ({ product }) => {
  return (
    <div className="grid place-items-center border rounded-3xl group shadow-md">
      <Link to={`product-details/${product._id}`}>
        <img
          className="hover:scale-105 duration-[1500ms] rounded-sm"
          src={product.img}
          alt="Product Image"
        />
        <h6 className="uppercase text-[10px] sm:text-xs md:text-sm text-gray-600 font-medium">
          {product.product_category}S
        </h6>
        <h5 className="text-sm sm:text-base md:text-lg mb-1">{product.product_name}</h5>
        <h6 className="text-xs sm:text-sm md:text-base text-gray-600 pb-4 transition-all duration-300  group-hover:hidden">
          ${product.price}
        </h6>
        <div className="my-3">
          <button className="hidden group-hover:block transition-all delay-1000 duration-500 text-center mx-auto btn-color text-white uppercase btn btn-xs sm:btn-sm text-[10px] sm:text-xs border-none">
            Add To Cart
          </button>
        </div>
      </Link>
    </div>
  );
};

export default BestSingleProduct;
