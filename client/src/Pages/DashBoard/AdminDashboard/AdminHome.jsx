import useTitle from "../../../hooks/useTitle";

const AdminHome = () => {
    // Use tile by custom useTitle Hook
  useTitle("Admin Home");

    return (
        <div>
           <h2 className="text-4xl uppercase font-semibold text-center mt-[35vh] font-sans">Admin Home</h2>
        </div>
    );
};

export default AdminHome;