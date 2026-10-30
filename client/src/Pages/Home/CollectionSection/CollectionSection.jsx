import img1 from "../../../assets/collection-img/h1-img-4.jpg";
import img2 from "../../../assets/collection-img/h1-img-5.jpg";
import SingleCollection from "./SingleCollection";

const collectionData = [
  {
    id: 0,
    img: img1,
    title: "Best baby environment setting",
    subtitle: "Metus aliquam eleifend mi in nulla cras sedo fel.",
  },
  {
    id: 2,
    img: img2,
    title: "Make a dreamy nursery",
    subtitle: "Convallis a cras semper auctor neque vita teme.",
  },
];

const CollectionSection = () => {
  return (
    <div className="mt-14 md:mt-20 lg:mt-24 w-full">
      <div className="md:flex items-center justify-center xl:gap-20 lg:gap-16 gap-2 mx-auto px-2 sm:px-4">
        {collectionData &&
          collectionData.length > 0 &&
          collectionData?.map((collection) => (
            <SingleCollection key={collection.id} collection={collection} />
          ))}
      </div>
    </div>
  );
};

export default CollectionSection;
