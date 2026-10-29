import { useEffect, useState } from "react";
import "./ShopByCategory.css";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { Link } from "react-router-dom";
import Aos from "aos";
import "aos/dist/aos.css";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";

const ShopByCategory = () => {
  const { email } = useSelector((state) => state.userSlice);
  const [categoryData, setCategoryData] = useState([]);
  const [activeTab, setActiveTab] = useState("scienceSubCategory");

  useEffect(() => {
    Aos.init();
  }, []);

  useEffect(() => {
    const baseUrl =
      import.meta.env.VITE_API_URL || "https://toy-town-server-emon83.vercel.app";
    fetch(`${baseUrl}/${activeTab}`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setCategoryData(data);
        } else if (data?.data && Array.isArray(data.data)) {
          setCategoryData(data.data);
        }
      })
      .catch((err) => console.log("ShopByCategory fetch error:", err));
  }, [activeTab]);

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  const handleMessage = () => {
    Swal.fire({
      icon: "error",
      title: "Error...",
      text: "You have to log in first to view details!",
    });
  };
  return (
    <div className="mt-28 my-container">
      <div className="text-center">
        <h2 className="text-5xl font-bold primary-font">Shop by category</h2>
        <p className="text-lg secondary-font my-6 text-gray-600">
          We’ve picked few pieces we’re pretty sure you’ll love. <br />
          Check back often and enjoy.
        </p>
      </div>
      <div className="mt-10">
        <Tabs>
          <TabList className="mx-auto text-center sm:flex items-center justify-center gap-2">
            <Tab
              onClick={() => handleTabClick("scienceSubCategory")}
              className="btn bg-pink-500 hover:bg-pink-600 border-none h-4 rounded-3xl btn-sm px-6 block sm:w-44 pt-2"
            >
              Science Toys
            </Tab>
            <Tab
              onClick={() => handleTabClick("languageSubCategory")}
              className="btn bg-pink-500 hover:bg-pink-600 border-none h-4 rounded-3xl btn-sm px-6 block sm:w-44 pt-2	"
            >
              Language Toys
            </Tab>
            <Tab
              onClick={() => handleTabClick("engineeringSubCategory")}
              className="btn bg-pink-500 hover:bg-pink-600 border-none h-4 rounded-3xl btn-sm px-6 block sm:w-44 pt-2"
            >
              Engineering Toys
            </Tab>
          </TabList>

          <TabPanel>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {categoryData &&
                categoryData.map((toy) => (
                  <div
                    key={toy._id}
                    className="p-6 text-center"
                    data-aos="fade-up"
                  >
                    <img className="rounded-md" src={toy.toyImage || toy.img} alt="" />
                    <h4 className="text-lg font-bold mt-6 mb-2">
                      {toy.toyName || toy.product_name}
                    </h4>
                    <p className="">Price: ${toy.price}</p>
                    <div className="flex justify-center items-center my-4">
                      <Rating style={{ maxWidth: 100 }} value={toy.rating || 5} />
                      <p>{toy.rating || 5}</p>
                    </div>
                    {email ? (
                      <Link to={`/product-details/${toy._id}`}>
                        <button className="btn bg-pink-500 hover:bg-pink-600 border-none h-4 rounded-3xl btn-sm px-4">
                          View Details
                        </button>
                      </Link>
                    ) : (
                      <div>
                        <button
                          onClick={handleMessage}
                          className="btn bg-pink-500 hover:bg-pink-600 border-none h-4 rounded-3xl btn-sm px-4"
                        >
                          View Details
                        </button>
                      </div>
                    )}
                  </div>
                ))}
            </div>
          </TabPanel>
          <TabPanel>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {categoryData &&
                categoryData.map((toy) => (
                  <div
                    key={toy._id}
                    className="p-6 text-center"
                    data-aos="fade-up"
                  >
                    <img className="rounded-md" src={toy.toyImage || toy.img} alt="" />
                    <h4 className="text-lg font-bold mt-6 mb-2">
                      {toy.toyName || toy.product_name}
                    </h4>
                    <p className="">Price: ${toy.price}</p>
                    <div className="flex justify-center items-center my-4">
                      <Rating style={{ maxWidth: 100 }} value={toy.rating || 5} />
                      <p>{toy.rating || 5}</p>
                    </div>
                    {email ? (
                      <Link to={`/product-details/${toy._id}`}>
                        <button className="btn bg-pink-500 hover:bg-pink-600 border-none h-4 rounded-3xl btn-sm px-4">
                          View Details
                        </button>
                      </Link>
                    ) : (
                      <div>
                        <button
                          onClick={handleMessage}
                          className="btn bg-pink-500 hover:bg-pink-600 border-none h-4 rounded-3xl btn-sm px-4"
                        >
                          View Details
                        </button>
                      </div>
                    )}
                  </div>
                ))}
            </div>
          </TabPanel>
          <TabPanel>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {categoryData &&
                categoryData.map((toy) => (
                  <div
                    key={toy._id}
                    className="p-6 text-center"
                    data-aos="fade-up"
                  >
                    <img className="rounded-md" src={toy.toyImage || toy.img} alt="" />
                    <h4 className="text-lg font-bold mt-6 mb-2">
                      {toy.toyName || toy.product_name}
                    </h4>
                    <p className="">Price: ${toy.price}</p>
                    <div className="flex justify-center items-center my-4">
                      <Rating style={{ maxWidth: 100 }} value={toy.rating || 5} />
                      <p>{toy.rating || 5}</p>
                    </div>
                    {email ? (
                      <Link to={`/product-details/${toy._id}`}>
                        <button className="btn bg-pink-500 hover:bg-pink-600 border-none h-4 rounded-3xl btn-sm px-4">
                          View Details
                        </button>
                      </Link>
                    ) : (
                      <div>
                        <button
                          onClick={handleMessage}
                          className="btn bg-pink-500 hover:bg-pink-600 border-none h-4 rounded-3xl btn-sm px-4"
                        >
                          View Details
                        </button>
                      </div>
                    )}
                  </div>
                ))}
            </div>
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
};

export default ShopByCategory;
