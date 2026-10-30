import "./BlogSection.css";
import Aos from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { blogData } from "./BlogData";
import SingleBlog from "./SingleBlog";

const BlogSection = () => {
  useEffect(() => {
    Aos.init();
  }, []);

  return (
    <div className="my-container mt-14 md:mt-20 lg:mt-24">
      <div className="text-center px-6 md:px-0">
        <h2 className="text-lg sm:text-2xl md:text-3xl">Read Our Blog</h2>
        <p className="text-xs sm:text-base md:text-lg sm:mt-2 md:mt-4 mb-4 sm:mb-6 md:mb-8 text-gray-600 px-10">
          We celebrate childhood by supporting babies, children, and families
          with thoughtful designs and quality materials.
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 px-6 sm:px-8 md:px-0">
        {blogData &&
          blogData.length > 0 &&
          blogData?.map((blog) => <SingleBlog key={blog.id} blog={blog} />)}
      </div>
    </div>
  );
};

export default BlogSection;
