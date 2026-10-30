import Aos from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import "./GallerySection.css";

import img1 from "../../../assets/gallery-img/gallery-01.jpg";
import img2 from "../../../assets/gallery-img/gallery-02.jpg";
import img3 from "../../../assets/gallery-img/gallery-03.jpg";
import img4 from "../../../assets/gallery-img/gallery-04.jpg";
import img5 from "../../../assets/gallery-img/gallery-05.jpg";
import img6 from "../../../assets/gallery-img/gallery-06.jpg";
import img7 from "../../../assets/gallery-img/gallery-07.jpg";
import img8 from "../../../assets/gallery-img/gallery-08.jpg";
import img9 from "../../../assets/gallery-img/gallery-09.jpg";
import img10 from "../../../assets/gallery-img/gallery-10.jpg";
import img11 from "../../../assets/gallery-img/gallery-11.jpg";
import img12 from "../../../assets/gallery-img/gallery-12.jpg";

const GallerySection = () => {
  const galleryImgData = [
    {
      img: img1,
    },
    {
      img: img2,
    },
    {
      img: img3,
    },
    {
      img: img4,
    },
    {
      img: img5,
    },
    {
      img: img6,
    },
    {
      img: img7,
    },
    {
      img: img8,
    },
    {
      img: img9,
    },
    {
      img: img10,
    },
    {
      img: img11,
    },
    {
      img: img12,
    },
  ];

  useEffect(() => {
    Aos.init();
  }, []);

  return (
    <div className="mt-14 md:mt-20 lg:mt-24 my-container">
      <div className="text-center">
        <h2 className="text-lg sm:text-2xl md:text-3xl">Gallery Section</h2>
        <h6 className="text-xs sm:text-base md:text-lg sm:mt-2 md:mt-4 mb-4 sm:mb-6 md:mb-8 text-gray-600 px-10">
          We’ve picked few pieces we’re pretty sure you’ll love.
          Check back often and enjoy.
        </h6>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-2 sm:gap-4 px-4 sm:px-6 mb-4">
        {galleryImgData?.map((imgData, index) => (
          <div className="group" key={index}>
            <img
              className="group-hover:scale-105 duration-[1500ms] transition-transform rounded-md"
              src={imgData.img}
              alt="Gallery Image"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default GallerySection;
