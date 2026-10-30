/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import {
  useGetReviewProductQuery,
  useSaveReviewProductMutation,
} from "../../redux/features/products/productsApi";

const ProductReview = ({ productData }) => {
  const { email, photoURL, name } = useSelector((state) => state.userSlice);
  const [saveReviewProduct, { data, error }] = useSaveReviewProductMutation();
  const productId = productData._id;
  const { data: reviewData } = useGetReviewProductQuery(productId);
  const [rating, setRating] = useState(0);
console.log(reviewData, productData);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    const product_id = productData._id;
    const product_name = productData.product_name;
    const feedbackInfo = {
      ...data,
      photoURL,
      rating,
      product_id,
      product_name,
    };
    //console.log(feedbackInfo);

    // Save review in Database
    saveReviewProduct(feedbackInfo);
    toast.success("Give feedback to your product Successfully");
  };
  return (
    <div className="w-full mt-10 border-2 rounded-3xl p-10">
      <h4 className="text-2xl uppercase">Reviews</h4>
      {<p className="mt-2 text-sm">There are no reviews yet.</p>}

      <h4 className="text-2xl uppercase mt-6">
        Be the first to review "{productData.product_name}"
      </h4>
      <p className="mt-2 text-sm">
        Your email address will not be published. Required fields are marked *
      </p>

      <h6 className="mt-8 text-lg uppercase">Your Ratings</h6>
      <div style={{ maxWidth: 180, width: "100%" }}>
        <Rating value={rating} onChange={setRating} />
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="w-full mt-10">
          <input
            className="pb-10 italic"
            placeholder="Your Review in detail (Minimum 15 words)"
            {...register("product_review")}
          />
        </div>
        {errors.notes && <span>This field is required</span>}
        <div className="md:flex items-center gap-4">
          <input
            placeholder="Your Name"
            defaultValue={name}
            {...register("name", { required: true })}
          />
          {errors.fav_product && (
            <span className="text-sky-500 text-xs font-semibold">
              This field is required
            </span>
          )}
          <input
            placeholder="Your Email"
            defaultValue={email}
            {...register("email", { required: true })}
          />
          {errors.email && (
            <span className="text-sky-500 text-xs font-semibold">
              This field is required
            </span>
          )}
        </div>

        <p className="text-xs -mt-2 mb-4">
          Save my name, email, and website in this browser for the next time I
          comment.
        </p>
        <input
          type="submit"
          value="Submit"
          className="btn btn-sm sm:btn-md btn-color border-none rounded-3xl w-40"
        />
        {/* <PaymentModal product={product} isOpen={isOpen} closeModal={closeModal}/> */}
      </form>
    </div>
  );
};

export default ProductReview;
