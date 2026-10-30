import useTitle from "../../../hooks/useTitle";

const PaymentHistory = () => {
  // Use tile by custom useTitle Hook
  useTitle("Payment History");

  return (
    <div>
      <h2 className="text-4xl uppercase font-semibold text-center mt-[35vh] font-sans">
        Payment History
      </h2>
    </div>
  );
};

export default PaymentHistory;
