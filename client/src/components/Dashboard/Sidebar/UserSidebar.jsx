import { NavLink } from "react-router-dom";
import { FaBookReader } from "react-icons/fa";
import { MdAccountBox, MdPayment } from "react-icons/md";

const UserSidebar = () => {
  return (
    <nav>
      {/* Menu Links */}
      <NavLink
        to="my-cart"
        className={({ isActive }) =>
          `flex items-center px-4 py-2 mt-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${
            isActive ? "bg-gray-300  text-gray-700" : "text-gray-600"
          }`
        }
      >
        <FaBookReader className="w-5 h-5" />

        <span className="mx-4 font-medium">My Cart</span>
      </NavLink>
      <NavLink
        to="my-purchase"
        className={({ isActive }) =>
          `flex items-center px-4 py-2 mt-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${
            isActive ? "bg-gray-300  text-gray-700" : "text-gray-600"
          }`
        }
      >
        <MdAccountBox className="w-5 h-5" />

        <span className="mx-4 font-medium">My Products</span>
      </NavLink>
      <NavLink
        to="payment-history"
        className={({ isActive }) =>
          `flex items-center px-4 py-2 mt-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${
            isActive ? "bg-gray-300  text-gray-700" : "text-gray-600"
          }`
        }
      >
        <MdPayment className="w-5 h-5" />
        <span className="mx-4 font-medium">My Payment History</span>
      </NavLink>
      <NavLink
        to="feedback"
        className={({ isActive }) =>
          `flex items-center px-4 py-2 mt-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${
            isActive ? "bg-gray-300  text-gray-700" : "text-gray-600"
          }`
        }
      >
        <MdPayment className="w-5 h-5" />
        <span className="mx-4 font-medium">Give Feedback</span>
      </NavLink>
    </nav>
  );
};

export default UserSidebar;
