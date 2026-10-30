import { testimonialData } from "./TestimonialData";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";

const ClientTestimonial = () => {
  return (
    <div className="bg-[#F7F3F0] mt-14 md:mt-20 lg:mt-24 py-12 sm:py-16">
      <div className="my-container text-center">
        <h2 className="text-lg sm:text-2xl md:text-3xl uppercase mb-2 sm:mb-4 md:mb-6">Happy Customers</h2>
        <div className="grid place-items-center items-start grid-cols-1 md:grid-cols-3 gap-6 px-4 sm:px-0">
          {testimonialData &&
            testimonialData.length > 0 &&
            testimonialData?.map((testimonial) => (
              <div key={testimonial.id}>
                <Rating
                  style={{ maxWidth: 90, margin: "0 auto"}}
                  value={testimonial.rating}
                  readOnly
                />
                <h4 className="text-sm sm:text-base md:text-lg lg:text-xl mt-1 sm:mt-3 md:mt-5 mb-3">{testimonial.message}</h4>
                <p className="text-sm sm:text-base md:text-lg">
                  {testimonial.name}, {testimonial.state}
                </p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ClientTestimonial;
