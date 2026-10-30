import useTitle from "../../../hooks/useTitle";
import Banner from "../Banner/Banner";
import BestSellerProduct from "../BestSellerProduct/BestSellerProduct";
import BlogSection from "../BlogSection/BlogSection";
import CategorySection from "../CategorySection/CategorySection";
import ClientTestimonial from "../ClientTestimonial/ClientTestimonial";
import CollectionSection from "../CollectionSection/CollectionSection";
import GallerySection from "../GallerySection/GallerySection";
import NewArrivalsProducts from "../NewArrivalsProducts/NewArrivalsProducts";
// import Newsletter from "../Newsletter/Newsletter";

const Home = () => {
  // Use tile by custom useTitle Hook
  useTitle("Home");
  
  return (
    <>
      <Banner />
      <NewArrivalsProducts/>
      <BlogSection />
      <BestSellerProduct/>
      <ClientTestimonial/>
      {/* <Newsletter/> */}
      <CategorySection/>
      <CollectionSection/>
      <GallerySection />
    </>
  );
};

export default Home;
