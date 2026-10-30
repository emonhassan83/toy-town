import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../Pages/Shared/Navbar/Navbar";
import Footer from "../Pages/Shared/Footer/Footer";

const Main = () => {
    const location = useLocation();
    const noHeaderFooter = location.pathname.includes('login') || location.pathname.includes('signUp');
    return (
        <>
            {noHeaderFooter || <Navbar />}
            <div className="">
            <Outlet/>
            </div>
            {noHeaderFooter || <Footer />}
        </>
    );
};

export default Main;