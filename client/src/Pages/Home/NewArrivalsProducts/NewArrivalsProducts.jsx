/* eslint-disable no-unused-vars */
import CardSkeleton from "../../../components/Card/CardSkeletion";
import { useGetProductsQuery } from "../../../redux/features/products/productsApi";
import NewSingleProduct from "./NewSingleProduct";

const NewArrivalsProducts = () => {
  const { data, isLoading, error } = useGetProductsQuery();
  const newArrivalsProducts = data?.filter(
    (product) => product.category === "New arrivals"
  );
  // console.log(newArrivalsProducts);
  return (
    <div className="mt-8 sm:mt-14 md:mt-20 lg:mt-24 my-container text-center">
      <h2 className="text-lg sm:text-2xl md:text-3xl primary-font">NEW ARRIVALS</h2>
      <p className="text-xs sm:text-base md:text-lg primary-font sm:mt-2 md:mt-4 mb-5 sm:mb-8 text-gray-600 px-10">
        Consectetur adipiscing elit ut aliquam duis convalli tellus id interdum ve.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 px-6 sm:px-8 md:px-0">

      {isLoading &&
          Array.from(new Array(4)).map((item, index) => (
            <CardSkeleton key={index} height={300} />
          ))}
        {!isLoading && newArrivalsProducts?.map((product) => (
          <NewSingleProduct key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default NewArrivalsProducts;
