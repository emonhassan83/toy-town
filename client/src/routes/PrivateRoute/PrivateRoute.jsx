import { Navigate, useLocation } from "react-router-dom";
import "./PrivateRoute.css";
import Loader from "../../components/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { auth } from "../../firebase/firebase.config";
import { setUser, toggleLoading } from "../../redux/features/user/userSlice";
import { useSaveTokenMutation } from "../../redux/features/auth/authApi";
// import toast, { Toaster } from "react-hot-toast";

const PrivateRoute = ({ children }) => {
  const { pathname } = useLocation();
  const { email, isLoading } = useSelector((state) => state.userSlice);
  const dispatch = useDispatch();
  const [tokenData, { data }] = useSaveTokenMutation();

  //For user sate persistence using onAuthStateChanged firebase function method and toggle loading after user signed up
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          setUser({
            name: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
          })
        );
        // console.log(user);
        dispatch(toggleLoading(false));
        tokenData(email);
      } else {
        dispatch(toggleLoading(false));
      }
    });
  }, [dispatch]);

  useEffect(() => {
    // Post and save token
    if (data) {
      localStorage.setItem("access_token", data?.token);
    }
  }, [data]);

  useEffect(() => {
    if (!email) {
      localStorage.removeItem("access_token");
    }
  }, [email]);

  if (isLoading) {
    return <Loader />;
  }
  if (!isLoading && !email) {
    return <Navigate to="/login" state={{ path: pathname }} />;
  }

  return children;
};

export default PrivateRoute;
