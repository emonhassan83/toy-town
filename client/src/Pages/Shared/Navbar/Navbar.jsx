import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../../../assets/logos/logo.png";
// import { BsCloudSunFill, BsFillCloudMoonFill } from "react-icons/bs";
import UserModal from "./UserModal";
// import { useTheme } from "../../../providers/ThemeProvider";
import { AiOutlineMenu } from "react-icons/ai";
import toast, { Toaster } from "react-hot-toast";
import { signOut } from "firebase/auth";
import { auth } from "../../../firebase/firebase.config";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../redux/features/user/userSlice";
import { useGetUserQuery } from "../../../redux/features/user/userApi";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const { email } = useSelector((state) => state.userSlice);
  const {data:user} = useGetUserQuery(email);
  // const { theme, themeSwitchHandler } = useTheme(); // for using light and dark themes

  // useEffect(() => {
  //   document.querySelector("html").setAttribute("data-theme", theme.mode);
  // }, [theme]);

  const handleLogout = () => {
    signOut(auth);
    dispatch(logout());
    toast.success("User logout successful");
  };
  return (
    <div className="bg-gray-100 sticky top-0 z-10 bg-transparent backdrop-blur-md px-1 sm:px-4 mx-auto md:h-[85px] sm:h-16 h-12">
      <Toaster />
      <div className="relative flex items-center justify-between">
        <Link
          to="/"
          aria-label="ToyTown"
          title="ToyTown"
          className="inline-flex items-center"
        >
          <div className="flex items-center justify-center md:w-40 sm:w-36 w-28 md:h-20 sm:h-16 h-12">
            <img className="md:w-32 sm:w-28 w-24" src={logo} alt="Logo Image" />
          </div>
        </Link>
        <ul className="items-center hidden space-x-8 lg:flex">
          <li>
            <NavLink
              to="/"
              aria-label="Home"
              title="Home"
              className={({ isActive }) => (isActive ? "active" : "default")}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/shop"
              aria-label="shop"
              title="shop"
              className={({ isActive }) => (isActive ? "active" : "default")}
            >
              Shop
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/pricing"
              aria-label="Pricing"
              title="Pricing"
              className={({ isActive }) => (isActive ? "active" : "default")}
            >
              Pricing
            </NavLink>
          </li>

          <li>
            <NavLink
              to={user?.role === 'admin'
              ? "/dashboard/admin-home"
              : user?.role === 'seller'
              ? "/dashboard/seller-home"
              : "/dashboard/my-cart"}
              aria-label="DashBoard"
              title="DashBoard"
              className={({ isActive }) => (isActive ? "active" : "default")}
            >
              DashBoard
            </NavLink>
          </li>
        </ul>
        <ul className="items-center hidden space-x-8 lg:flex">
          {/* For dark and light mood */}
          {/* <div className="-mr-4">
            {theme.mode == "dark" ? (
              <BsCloudSunFill
                title="Make Light"
                className="text-3xl cursor-pointer"
                onClick={() => themeSwitchHandler()}
              />
            ) : (
              <BsFillCloudMoonFill
                title="Make Dark"
                className="text-3xl cursor-pointer"
                onClick={() => themeSwitchHandler()}
              />
            )}
          </div> */}
          {email ? (
            <>
              <UserModal handleLogout={handleLogout} />
            </>
          ) : (
            <>
              <li>
                <Link to="/login" aria-label="Login" title="Login">
                  <button className="btn btn-color border-none h-4 rounded-3xl btn-sm px-6">
                    Login
                  </button>
                </Link>
              </li>
            </>
          )}
        </ul>
        <div className="lg:hidden">
          <button
            aria-label="Open Menu"
            title="Open Menu"
            onClick={() => setIsMenuOpen(true)}
          >
            <AiOutlineMenu className="w-5 text-gray-600" />
          </button>
          {isMenuOpen && (
            <div className="absolute z-10 top-0 left-0 w-full">
              <div className="sm:p-5 px-3 py-2 bg-white border rounded shadow-sm">
                <div className="flex items-center justify-between sm:mb-4 h-12 sm:w-16">
                  <div>
                    <Link
                      to="/"
                      aria-label="ToyTown"
                      title="ToyTown"
                      className="inline-flex items-center"
                    >
                      <div className="flex items-center justify-center w-20 h-16">
                        <img className="w-20" src={logo} alt="" />
                      </div>
                    </Link>
                  </div>
                  <div>
                    <button
                      aria-label="Close Menu"
                      title="Close Menu"
                      className="p-2 -mt-2 -mr-2 transition duration-200 rounded hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <svg className="sm:w-5 w-4 text-gray-600" viewBox="0 0 24 24">
                        <path
                          fill="currentColor"
                          d="M19.7,4.3c-0.4-0.4-1-0.4-1.4,0L12,10.6L5.7,4.3c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4l6.3,6.3l-6.3,6.3 c-0.4,0.4-0.4,1,0,1.4C4.5,19.9,4.7,20,5,20s0.5-0.1,0.7-0.3l6.3-6.3l6.3,6.3c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3 c0.4-0.4,0.4-1,0-1.4L13.4,12l6.3-6.3C20.1,5.3,20.1,4.7,19.7,4.3z"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
                <nav>
                  <ul className="sm:space-y-3 space-y-1">
                    <li>
                      <Link
                        to="/shop"
                        aria-label="Shop"
                        title="Shop"
                        className="text-sm sm:text-[15px] font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
                      >
                        Shop
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/pricing"
                        aria-label="Pricing"
                        title="Pricing"
                        className="text-sm sm:text-[15px] font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
                      >
                        Pricing
                      </Link>
                    </li>

                    <li>
                      <Link
                         to={user?.role === 'admin'
                         ? "/dashboard/admin-home"
                         : user?.role === 'seller'
                         ? "/dashboard/seller-home"
                         : "/dashboard/my-cart"}
                        aria-label="DashBoard"
                        title="DashBoard"
                        className="text-sm sm:text-[15px] font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
                      >
                        DashBoard
                      </Link>
                    </li>

                    <li>
                      {/* For dark and light mood */}
                      {/* <div className="-mr-4">
                        {theme.mode == "dark" ? (
                          <BsCloudSunFill
                            title="Make Light"
                            className="text-3xl cursor-pointer"
                            onClick={() => themeSwitchHandler()}
                          />
                        ) : (
                          <BsFillCloudMoonFill
                            title="Make Dark"
                            className="text-3xl cursor-pointer"
                            onClick={() => themeSwitchHandler()}
                          />
                        )}
                      </div> */}
                    </li>
                    {email ? (
                      <li>
                        <UserModal handleLogout={handleLogout} />
                      </li>
                    ) : (
                      <li>
                        <Link
                          to="/login"
                          aria-label="Login"
                          title="Login"
                          className="text-sm sm:text-[15px] font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
                        >
                          <button className="btn btn-color border-none h-4 rounded-3xl btn-sm px-6 -ml-2">
                            Login
                          </button>
                        </Link>
                      </li>
                    )}
                  </ul>
                </nav>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
