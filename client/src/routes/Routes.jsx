import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import Home from "../Pages/Home/Home/Home";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import UserProfile from "../Pages/UserProfile/UserProfile";
import DashboardLayout from "../Layout/DashBoardLayout";
import MyCart from "../Pages/DashBoard/UserDashboard/MyCart";
import Checkout from "../Pages/DashBoard/UserDashboard/Checkout";
import Payment from "../Pages/DashBoard/UserDashboard/Payment";
import PaymentHistory from "../Pages/DashBoard/UserDashboard/PaymentHistory";
import Feedback from "../Pages/DashBoard/UserDashboard/Feedback";
import SellerHome from "../Pages/DashBoard/SellerDashboard/SellerHome";
import AddProduct from "../Pages/DashBoard/SellerDashboard/AddProduct";
import MyPurchase from "../Pages/DashBoard/UserDashboard/MyPurchase";
import MyProduct from "../Pages/DashBoard/SellerDashboard/MyProduct";
import AdminHome from "../Pages/DashBoard/AdminDashboard/AdminHome";
import ManageUsers from "../Pages/DashBoard/AdminDashboard/ManageUsers";
import ManageProduct from "../Pages/DashBoard/AdminDashboard/ManageProduct";
import Shop from "../Pages/Shop/Shop";
import Pricing from "../Pages/Pricing/Pricing";
import ProductDetails from "../Pages/ProductDetails/ProductDetails";
import BlogDetails from "../Pages/BlogDetails/BlogDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/shop",
        element: (
          <PrivateRoute>
            <Shop />
          </PrivateRoute>
        ),
      },
      {
        path: "/product-details/:id",
        element: (
          <PrivateRoute>
            <ProductDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "/categoryToyDetails/:id",
        element: (
          <PrivateRoute>
            <ProductDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "/shop/product-details/:id",
        element: (
          <PrivateRoute>
            <ProductDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "/blog-details/:id",
        element: (
          <PrivateRoute>
            <BlogDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "/pricing",
        element: (
          <PrivateRoute>
            <Pricing />
          </PrivateRoute>
        ),
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signUp",
        element: <SignUp />,
      },
      {
        path: "/user-profile",
        element: (
          <PrivateRoute>
            <UserProfile />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      //Users routes
      {
        path: "/dashboard/my-cart",
        element: <MyCart />,
      },
      {
        path: "/dashboard/checkout",
        element: <Checkout />,
      },
      {
        path: "/dashboard/payment",
        element: <Payment />,
      },
      {
        path: "/dashboard/payment-history",
        element: <PaymentHistory />,
      },
      {
        path: "/dashboard/my-purchase",
        element: <MyPurchase />,
      },
      {
        path: "/dashboard/feedback",
        element: <Feedback />,
      },
      //Seller Routes
      {
        path: "/dashboard/seller-home",
        element: <SellerHome />,
      },
      {
        path: "/dashboard/add-product",
        element: <AddProduct />,
      },
      {
        path: "/dashboard/my-products",
        element: <MyProduct />,
      },
      //admin routes
      {
        path: "/dashboard/admin-home",
        element: <AdminHome />,
      },
      {
        path: "/dashboard/manage-users",
        element: <ManageUsers />,
      },
      {
        path: "/dashboard/manage-products",
        element: <ManageProduct />,
      },
    ],
  },
]);

export default router;
