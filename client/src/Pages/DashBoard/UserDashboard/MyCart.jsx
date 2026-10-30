import { useDispatch, useSelector } from "react-redux";
import {
  useDeleteCartProductMutation,
  useGetCartProductsQuery,
} from "../../../redux/features/products/productsApi";
import { Link } from "react-router-dom";
import {
  addToCart,
  removeFromCart,
} from "../../../redux/features/products/productSlice";
import toast, { Toaster } from "react-hot-toast";
import useTitle from "../../../hooks/useTitle";

const MyCart = () => {
  const dispatch = useDispatch();
  const { email } = useSelector((state) => state.userSlice);
  const [deleteCartProduct] = useDeleteCartProductMutation();
  const {
    data: cartProduct,
    isLoading,
    error,
  } = useGetCartProductsQuery(email);

  // Use tile by custom useTitle Hook
  useTitle("My Cart");

  const handleAddToCart = (product) => {
    dispatch(addToCart({ product_id: product._id }));
  };

  const handleRemoveFromCart = (product) => {
    //Todo: remove from cart not working properly
    deleteCartProduct(product._id);
    console.log(product);
    toast.success("Product removed successfully");
  };

  return (
    <div>
      <Toaster />
      {error && <p className="text-red-500 mt-[35vh]">{error.message}</p>}
      {cartProduct && cartProduct?.length > 0 && Array.isArray(cartProduct) && (
        <div className="overflow-x-auto">
          <table className="table w-[100%]">
            <thead>
              <tr>
                <th>SL</th>
                <th>Product Image</th>
                <th>Product Name</th>
                <th>Product Category</th>
                <th>Seller name</th>
                <th>Available Quantity</th>
                <th>Action</th>
                <th>Pay</th>
              </tr>
            </thead>
            {/*Table Body Data*/}
            <tbody>
              {cartProduct &&
                cartProduct.length > 0 &&
                cartProduct.map((product, index) => (
                  <tr key={product._id}>
                    <td>{index + 1}</td>
                    <td>
                      <div className="flex items-center space-x-3">
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
                            <img src={product?.img} alt="Product Image" />
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>{product?.name}</td>
                    <td>{product?.product_category}</td>
                    <td>{product?.seller}</td>
                    <td className="text-center">
                      {product?.availableQuantity}
                    </td>
                    <td>
                      <button
                        onClick={() => handleRemoveFromCart(product)}
                        className="btn btn-xs btn-color border-none"
                      >
                        Delete
                      </button>
                    </td>
                    <td>
                      <Link to="/dashboard/checkout">
                        <button
                          onClick={() => handleAddToCart(product)}
                          className="btn btn-xs btn-color border-none"
                        >
                          ${product?.price} TK
                        </button>
                      </Link>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyCart;
