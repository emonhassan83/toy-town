import bannerImg from "../../../assets/banner/hero.png";

const Banner = () => {
  return (
    <div className="relative">
      <img src={bannerImg} alt="Banner Image" />

      <div className="w-full absolute top-10 sm:top-24 lg:top-48 text-white flex flex-col">
        <h1 className="text-2xl sm:text-4xl md:text-5xl xl:text-7xl font-bold primary-font text-center">
          Toytown - Kids Toys Store
        </h1>
        <h2 className="secondary-font text-sm sm:text-2xl lg:text-4xl font-bold text-center mb-3 sm:my-6">
          Explore Our Exclusive Store
        </h2>
        <div className="text-center">
          <button className="btn uppercase btn-color border-none rounded-3xl text-[10px] sm:text-sm md:text-base btn-xs sm:btn-md px-2 sm:px-4 md:px-6">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
