const SingleRelatedProduct = ({ product }) => {
  return (
    <div className="grid place-items-center border rounded-3xl">
      <img
        className="hover:scale-105 duration-[1500ms] rounded-sm"
        src={product.img}
        alt="Product Image"
      />
      <h6 className="uppercase text-sm text-gray-600">
        {product.product_category}S
      </h6>
      <h5 className="text-lg mb-1">{product.product_name}</h5>
      <h6 className="text-gray-600 pb-4">${product.price}</h6>
    </div>
  );
};

export default SingleRelatedProduct;
