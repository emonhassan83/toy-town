import useTitle from "../../../hooks/useTitle";

const SellerHome = () => {
    // Use tile by custom useTitle Hook
  useTitle("Seller Home");

    return (
        <div>
            <h2 className="text-4xl uppercase font-semibold text-center mt-[35vh] font-sans">Seller Home</h2>
        </div>
    );
};

export default SellerHome;