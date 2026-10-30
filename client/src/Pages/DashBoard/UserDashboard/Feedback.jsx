import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { useSaveFeedbackMutation } from "../../../redux/features/feedback/feedbackApi";
import useTitle from "../../../hooks/useTitle";
import toast from "react-hot-toast";

function getRating(rating) {
  switch (rating) {
    case 1:
      return 'Poor';
    case 2:
      return 'Nothing special';
    case 3:
      return 'Average';
    case 4:
      return 'Very good';
    case 5:
      return 'Excellent';
    default:
      return 'None';
  }
}

const Feedback = () => {
  const [rating, setRating] = useState(5);
  const { email, photoURL, name } = useSelector((state) => state.userSlice);
  const [feedbackData, {data, error}] = useSaveFeedbackMutation();
  // Use tile by custom useTitle Hook
  useTitle("Feedback");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const feedbackInfo = {
      ...data, email, name, photoURL, rating
    }
    //Save feedback info to DataStore
    feedbackData(feedbackInfo);
    toast.success('Feedback info saved Successfully');
  };
  return (
    <div className="">
      <h6 className="text-3xl uppercase md:my-10 mt-4 mb-4  text-center">Feedback Us</h6>
      <div style={{ maxWidth: 180, width: '100%' ,margin: "0 auto" }}>
        <Rating value={rating} onChange={setRating}/>
        <div>
          <p className="text-center mb-6">{`${getRating(rating)}`}</p>
        </div>
    </div>
      <div className="w-full md:w-[60vw] mx-auto">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label className="text-xs sm:text-sm">
            Which product you liked most?
          </label>
          <input
            placeholder="Product you liked most"
            {...register("fav_product", { required: true })}
          />
          {errors.fav_product && (
            <span className="text-sky-500 text-xs font-semibold">
              This field is required
            </span>
          )}
        </div>

        <div>
          <label className="text-xs sm:text-sm">
            Do you have any suggestion for us?
          </label>
          <input
            placeholder="Suggestion"
            {...register("suggestion", { required: true })}
          />
          {errors.suggestion && (
            <span className="text-sky-500 text-xs font-semibold">
              This field is required
            </span>
          )}
        </div>

        <div className="w-full">
          <label>Kindly express your care in a short way</label>
          <input
            className="pb-10 italic"
            placeholder="Review in detail (Minimum 15 words)"
            {...register("notes")}
          />
        </div>
        {errors.notes && <span>This field is required</span>}

        <input
          type="submit"
          value="Send Review"
          className="btn btn-sm sm:btn-md btn-color border-none rounded-3xl w-40"
        />
        {/* <PaymentModal product={product} isOpen={isOpen} closeModal={closeModal}/> */}
      </form>
      </div>
    </div>
  );
};

export default Feedback;
