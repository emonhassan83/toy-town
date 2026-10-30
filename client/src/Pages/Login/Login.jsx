/* eslint-disable no-unused-vars */
import Lottie from "lottie-react";
import animation from "../../assets/animation_login.json";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Login.css";
import { useForm } from "react-hook-form";
import logo from "../../assets/logos/google.png";
import useTitle from "../../hooks/useTitle";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  loginUser,
  socialLoginUser,
} from "../../redux/features/user/userSlice";
import { useEffect } from "react";
import { useSaveUserMutation } from "../../redux/features/user/userApi";


const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  useTitle("Login");
  const dispatch = useDispatch();
  const { isLoading, email, name, photoURL:imageUrl, isError, error } = useSelector(
    (state) => state.userSlice
  );
  const [saveUser, { data, error: userError }] = useSaveUserMutation();
  const from = location.state?.from?.pathname || "/";

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (isError && error && userError) {
      toast.error(error);
      toast.error(userError);
    }
  }, [isError, error, userError]);

  useEffect(() => {
    if (!isLoading && email) {
      navigate(from, { replace: true });
      toast.success("User login successfully");
    }
  }, [isLoading, email]);

  const handleSocialLogin = () => {
    dispatch(socialLoginUser());
  };

  useEffect(() => {
    if (!isLoading && email && name && imageUrl) {
      // Save user data to the database
      const userData = {
        name,
        email,
        imageUrl,
      };

      saveUser({ userData, email });
    }
  }, [isLoading, email, name, imageUrl, saveUser]);

  const onSubmit = (data) => {
    const email = data.email;
    const password = data.password;
    dispatch(loginUser({ email, password }));
  };

  return (
    <div className="w-full md:flex items-center justify-center mx-auto bg-[#caf0f8] md:h-[100vh]">
      <Toaster />
      <div className="md:w-1/2 bg-gray-100 login-card mx-auto">
        <h2 className="text-xl sm:text-2xl font-bold mb-2 text-center">
          Login Please
        </h2>
        <p className="text-sm text-gray-400 text-center mb-6">
          Sign in to access your account
        </p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label className="text-xs sm:text-sm">Username or Email</label>
          <input defaultValue="" {...register("email")} />
          {errors.email && (
            <span className="text-xs">This field is required</span>
          )}

          <label className="text-xs sm:text-sm">Password</label>
          <input {...register("password", { required: true })} />
          {errors.password && (
            <span className="text-xs">This field is required</span>
          )}
          <input
            type="submit"
            value="Login"
            className="btn btn-sm sm:btn-md btn-color border-none btn-block rounded-3xl"
          />
        </form>
        <p className="px-3 text-sm dark:text-gray-400 text-center mt-3">
          Login with social accounts
        </p>
        <div>
          <div
            onClick={() => handleSocialLogin()}
            className="flex items-center justify-center gap-4 social-login my-4"
          >
            <img className="w-6 ml-4" src={logo} alt="Google logo" />
            <p className="text-sm sm:text-base">Continue with Google</p>
          </div>
          <p className="text-center">
            <small className="text-xs sm:text-sm">
              New to Toy Town Please{" "}
              <Link to="/signUp" className="text-color font-bold">
                Sign Up
              </Link>
            </small>
          </p>
        </div>
      </div>
      <div className="md:w-1/2">
        <Lottie animationData={animation} loop={true} style={{ height: 475, width: 370 }} />
      </div>
    </div>
  );
};

export default Login;
