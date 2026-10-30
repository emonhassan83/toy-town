/* eslint-disable no-unused-vars */
import { useNavigate, useParams } from "react-router-dom";
import ProductDescription from "./ProductDescription";
import ProductInformation from "./ProductInformation";
import ProductReview from "./ProductReview";
import { useState } from "react";
import SingleRelatedProduct from "./SingleRelatedProduct";
import {
  useGetProductsByCategoryQuery,
  useGetProductsByIdQuery,
  useSaveCartProductMutation,
} from "../../redux/features/products/productsApi";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { AiFillHeart } from "react-icons/ai";
import useTitle from "../../hooks/useTitle";

const ProductDetails = () => {
  const [activeComponent, setActiveComponent] = useState("ProductDescription"); //by default component uses active component
  const { id } = useParams();
  const {
    email: customer_email,
    photoURL: customer_img,
    name: customer_name,
  } = useSelector((state) => state.userSlice);
  const { data: productData, isLoading, error } = useGetProductsByIdQuery(id);
  const [saveCartProduct, { data }] = useSaveCartProductMutation();
  const { data: products } = useGetProductsByCategoryQuery(
    productData?.product_category
  );
  const navigate = useNavigate();

  const relatedProducts = products?.filter(
    (product) => product._id !== productData._id
  );

  // Use tile by custom useTitle Hook
  useTitle(`Product-Details-${productData?._id}`);

  const handleButtonClick = (componentName) => {
    setActiveComponent(componentName);
  };

  const saveCartProductToDb = (productData) => {
    const product = {
      productId: productData._id,
      customer_name,
      customer_email,
      customer_img,
      name: productData.product_name,
      img: productData.img,
      product_category: productData.product_category,
      price: productData.price,
      quantity: 1,
      seller: productData.seller,
      availableQuantity: productData.quantity - 1,
      date: new Date(),
      color: productData.color,
      isPurchase: false,
    };

    // Save cart product to database
    saveCartProduct(product);
    toast.success("Product add to cart successfully");
    navigate("/");
  };

  return (
    <div className="my-container my-4 px-4">
      <div className="md:flex items-center gap-10">
        <div className="md:w-[45%]">
          <img className="hover:scale-105 duration-[1500ms] rounded-sm" src={productData?.img} alt="Product Image" />
        </div>
        <div className="md:w-[55%]">
          <h2 className="text-base sm:text-xl md:text-2xl lg:text-4xl font-medium mt-3">{productData?.product_name}</h2>
          <h4 className="text-sm sm:text-base md:text-2xl my-1 sm:my-2">${productData?.price}</h4>
          <p className="text-xs sm:text-sm md:text-base text-gray-600">{productData?.description}</p>

          <button
            onClick={() => saveCartProductToDb(productData)}
            className="btn btn-xs sm:btn-sm btn-color text-[10px] sm:text-sm border-none mt-4"
          >
            Add To Cart
          </button>

          <div className="flex items-center gap-1 my-5">
            <AiFillHeart className="text-sky-500 sm:text-xl" />
            <p className="text-xs sm:text-sm uppercase">Add To Wishlist</p>
          </div>
          <h6 className="text-xs sm:text-sm uppercase">SKU: {productData?.SKU}</h6>
          <h6 className="text-xs sm:text-sm my-1">Category: {productData?.product_category}</h6>
          <div className="flex items-center gap-1 text-xs sm:text-sm">
            <p>Tags:</p>
            <div className="flex items-center gap-1">
              {productData?.tags.map((item, index) => (
                <p
                  className="py-1 px-3 border rounded-sm text-[10px] sm:text-xs uppercase"
                  key={index}
                >
                  {item}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="my-10">
        <div className="flex items-center justify-center gap-8">
          <button
          className={`text-sm sm:text-base md:text-xl ${activeComponent === 'ProductDescription'? 'font-semibold': "font-normal"}`}
            onClick={() => handleButtonClick("ProductDescription")}
          >
            Description
          </button>
          <button
            className={`text-sm sm:text-base md:text-xl ${activeComponent === 'ProductInformation'? 'font-semibold': "font-normal"}`}
            onClick={() => handleButtonClick("ProductInformation")}
          >
            Additional Information
          </button>
          <button
            className={`text-sm sm:text-base md:text-xl ${activeComponent === 'ProductReview'? 'font-semibold': "font-normal"}`}
            onClick={() => handleButtonClick("ProductReview")}
          >
            Review
          </button>
        </div>

        <div>
          {activeComponent === "ProductDescription" && (
            <ProductDescription productData={productData} />
          )}
          {activeComponent === "ProductInformation" && (
            <ProductInformation productData={productData} />
          )}
          {activeComponent === "ProductReview" && (
            <ProductReview productData={productData} />
          )}
        </div>
      </div>

      <div className="my-10">
        <h4 className="text-lg sm:text-2xl my-6 text-center">RELATED PRODUCTS</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 mx-auto">
          {relatedProducts &&
            relatedProducts.length > 0 &&
            relatedProducts.map((product) => (
              <SingleRelatedProduct key={product._id} product={product} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
