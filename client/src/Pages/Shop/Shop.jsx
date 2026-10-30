/* eslint-disable no-unused-vars */
import { useState } from "react";
import SingleProduct from "./SingleProduct";
import { useGetProductsByCategoryQuery } from "../../redux/features/products/productsApi";
import useTitle from "../../hooks/useTitle";
import CardSkeleton from "../../components/Card/CardSkeletion";

const Shop = () => {
  const [selectedCategory, setSelectedCategory] = useState("Bed"); // Default category
  const {
    data: productData,
    isLoading,
    error,
  } = useGetProductsByCategoryQuery(selectedCategory);

  // Use tile by custom useTitle Hook
  useTitle("Shop");

  const categoryList = [
    "Bed",
    "Carriage",
    "Wood Toys",
    "Accessories",
    "Baby Equipment",
    "For Home",
    "Soft Toy",
    "Educational Toy",
    "Others",
  ];

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className="md:flex items-start gap-10 my-container my-10 px-6 sm:px-10 md:px-0">
      {/* For small devices */}
      <details className="dropdown">
        <summary className="m-1 md:hidden cursor-pointer uppercase">Categories</summary>
        <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
        {categoryList?.map((item, index) => (
            <div className="my-1" key={index}>
              <button
                className="text-xs uppercase w-full"
                onClick={() => handleCategoryClick(item)}
              >
                {item}
              </button>
            </div>
          ))}
        </ul>
      </details>

      <div className="hidden md:block md:w-[260px] text-center">
        <h6 className="text-base uppercase">
          Categories
        </h6>
        <div className="flex flex-col">
          {categoryList?.map((item, index) => (
            <div className="my-1" key={index}>
              <button
                className="text-sm rounded-md w-full"
                onClick={() => handleCategoryClick(item)}
              >
                {item}
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className="w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 mt-12 md:mt-0">
          {isLoading &&
            Array.from(new Array(6)).map((item, index) => (
              <CardSkeleton key={index} height={300} />
            ))}
          {!isLoading &&
            productData &&
            productData.length > 0 &&
            productData?.map((product) => (
              <SingleProduct key={product._id} product={product} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Shop;
