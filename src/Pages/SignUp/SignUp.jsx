import Lottie from "lottie-react";
import animation from "../../assets/animation_login.json";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./SignUp.css";
import { useForm } from "react-hook-form";
import logo from "../../assets/logos/google.png";
import { useEffect } from "react";
import useTitle from "../../hooks/useTitle";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  createUser,
  socialLoginUser,
} from "../../redux/features/user/userSlice";
import { useSaveUserMutation } from "../../redux/features/user/userApi";

const SignUp = () => {
  useTitle("SignUp");
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { isLoading, email, name, photoURL:imageUrl, isError, error } = useSelector(
    (state) => state.userSlice
  );
  const [saveUser, { data, error: userError }] = useSaveUserMutation();
  const from = location.state?.from?.pathname || "/";

  // For lottie react animations
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
    if ((isError && error) || userError) {
      toast.error(error);
      toast.error(userError);
    }
  }, [isError, error, userError]);

  useEffect(() => {
    if (!isLoading && email) {
      navigate(from, { replace: true });
      toast.success("User sign-up successfully");
    }
  }, [isLoading, email]);

  const url = `https://api.imgbb.com/1/upload?key=${
    import.meta.env.VITE_IMGBB_KEY
  }`;

  const onSubmit = (data) => {
    //Image upload
    const formData = new FormData();
    formData.append("image", data.photoUrl[0]);

    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imageData) => {
        const imageUrl = imageData.data.display_url;
        dispatch(
          createUser({
            name: data?.userName,
            email: data?.email,
            password: data?.password,
            imageUrl,
          })
        );
        // Save user data to the database
       if (data) {
        const userData = {
          name: data && data?.userName,
          email: data && data?.email,
          imageUrl,
        };
        console.log(userData);
        saveUser({ userData, email:data?.email });
       }
      });
  };

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
  }, [isLoading, email, name, saveUser]);

  return (
    <div className="md:flex justify-center items-center md:h-[100vh] bg-[#caf0f8]">
      <Toaster />
      <div className="md:w-1/2 signUp-card bg-gray-100 mx-auto">
        <h2 className="text-xl sm:text-2xl font-bold mb-2 text-center">
          Sign Up Please
        </h2>
        <p className="text-sm text-gray-400 mb-4 text-center">
          Welcome to Toy Town
        </p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label className="text-xs sm:text-sm">Full Name</label>
          <input defaultValue="" {...register("userName")} />
          {errors.userName && (
            <span className="text-sky-500 text-xs font-semibold">
              This field is required
            </span>
          )}

          <label className="text-xs sm:text-sm">Username or Email</label>
          <input {...register("email", { required: true })} />
          {errors.email && (
            <span className="text-sky-500 text-xs font-semibold">
              This field is required
            </span>
          )}

          <label className="text-xs sm:text-sm">Password</label>
          <input type="password" defaultValue="" {...register("password")} />
          {errors.password && (
            <span className="text-sky-500 text-xs font-semibold">
              This field is required
            </span>
          )}

          <label className="text-xs sm:text-sm">Choose Photo</label>
          <input
            required
            type="file"
            accept="image/*"
            {...register("photoUrl")}
          />
          {errors.photoUrl && (
            <span className="text-sky-500 text-xs font-semibold">
              This field is required
            </span>
          )}

          <input
            type="submit"
            value="sign up"
            className="btn btn-sm sm:btn-md btn-color border-none btn-block rounded-3xl"
          />
        </form>

        <p className="px-3 text-sm text-gray-600 text-center mt-3">
          SignUp with social accounts
        </p>
        <div>
          <div
            onClick={() => handleSocialLogin()}
            className="flex items-center justify-center gap-4 social-signup mt-3 cursor-pointer"
          >
            <img className="w-6" src={logo} alt="Google Logo" />
            <p className="text-sm sm:text-base">Continue with Google</p>
          </div>
          <p className="text-center mt-3 text-gray-600">
            <small className="text-xs sm:text-sm">
              Already have an Account Please{" "}
              <Link to="/login" className="text-color font-bold">
                Login
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

export default SignUp;
