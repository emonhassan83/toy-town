import useTitle from "../../../hooks/useTitle";

const Payment = () => {
  // Use tile by custom useTitle Hook
  useTitle("Payment");

  return (
    <div>
      <h2 className="text-4xl uppercase font-semibold text-center mt-[35vh] font-sans">
        Payment
      </h2>
    </div>
  );
};

export default Payment;
