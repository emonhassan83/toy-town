/* eslint-disable no-unused-vars */
import CardSkeleton from "../../../components/Card/CardSkeletion";
import { useGetProductsQuery } from "../../../redux/features/products/productsApi";
import BestSingleProduct from "./BestSingleProduct";

const BestSellerProduct = () => {
  const { data, isLoading, error } = useGetProductsQuery();
  const bestSellerProducts = data?.filter(
    (product) => product.category === "Best Seller"
  );

  return (
    <div className="mt-14 md:mt-20 lg:mt-24 my-container text-center">
      <h2 className="text-lg sm:text-2xl md:text-3xl">BEST SELLER PRODUCT</h2>
      <p className="text-xs sm:text-base md:text-lg sm:mt-2 md:mt-4 mb-4 sm:mb-6 md:mb-8 text-gray-600 px-10">
        Consectetur adipiscing elit ut aliquam duis convalli convalli tellus id
        interdum ve.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 px-6 sm:px-8 md:px-0">
        {isLoading &&
          Array.from(new Array(4)).map((item, index) => (
            <CardSkeleton key={index} height={300} />
          ))}
        {!isLoading &&
          bestSellerProducts?.map((product) => (
            <BestSingleProduct key={product._id} product={product} />
          ))}
      </div>
    </div>
  );
};

export default BestSellerProduct;
