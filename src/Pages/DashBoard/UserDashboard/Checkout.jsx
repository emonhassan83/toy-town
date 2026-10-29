/* eslint-disable no-unsafe-optional-chaining */
import { RxCross1 } from "react-icons/rx";
import { useSelector } from "react-redux";
import { useDeleteCartProductMutation, useGetCartProductsQuery, usePaymentProductMutation } from "../../../redux/features/products/productsApi";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useTitle from "../../../hooks/useTitle";

const Checkout = () => {
  const { cartProduct } = useSelector((state) => state.cartProductSlice);
  const { name, email } = useSelector((state) => state.userSlice);
  const { data: cartProducts } = useGetCartProductsQuery(email);
  const [savePaymentProduct] = usePaymentProductMutation();
  const [deleteCartProduct] = useDeleteCartProductMutation();
  const navigate = useNavigate();
  // Use tile by custom useTitle Hook
  useTitle("Checkout");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  
  let product;
  if (cartProducts && cartProduct?.product_id) {
    [product] = cartProducts?.filter(
      (p) => p._id === cartProduct.product_id
    );
  } else if (cartProducts && cartProducts.length > 0) {
    product = cartProducts[0];
  }

  const onSubmit = (data) => {
    if (!product) {
      toast.error("Please select a product from your cart to checkout");
      navigate('/dashboard/my-cart');
      return;
    }
    const productData = {
      ...data,
      product_name: product.name,
      product_img: product.img,
      product_id: product.productId,
      customer_name: product.customer_name || name,
      customer_email: email,
      date: product.date || new Date(),
      price: (product?.price || 0) + 19,
      isPurchase: true,
    };
    //Save product in database
    savePaymentProduct(productData);
    toast.success("Product Purchase successfully");

    //remove product from cart
    if (product._id) {
      deleteCartProduct(product._id);
    }
    navigate('/dashboard/my-cart');
  };

  return (
    <>
    <Toaster/>
    <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-10">
      <div className="w-full lg:w-1/2">
        <h4 className="text-2xl font-bold uppercase mb-4">Checkout</h4>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              defaultValue={name}
              {...register("name", { required: true })}
              className="input input-bordered w-full"
            />
            {errors.name && (
              <span className="text-xs text-red-500">Name is required</span>
            )}
          </div>
          <div>
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              defaultValue={email}
              {...register("email", { required: true })}
              className="input input-bordered w-full"
            />
            {errors.email && (
              <span className="text-xs text-red-500">Email is required</span>
            )}
          </div>
          <div>
            <label className="label">
              <span className="label-text">Address</span>
            </label>
            <input
              type="text"
              {...register("address", { required: true })}
              className="input input-bordered w-full"
            />
            {errors.address && (
              <span className="text-xs text-red-500">Address is required</span>
            )}
          </div>
          <div>
            <label className="label">
              <span className="label-text">Phone</span>
            </label>
            <input
              type="text"
              {...register("phone", { required: true })}
              className="input input-bordered w-full"
            />
            {errors.phone && (
              <span className="text-xs text-red-500">Phone is required</span>
            )}
          </div>
          <button type="submit" className="btn btn-primary w-full">
            Complete Order
          </button>
        </form>
      </div>

      <div className="w-full lg:w-1/2 bg-base-200 p-6 rounded-box">
        <h4 className="text-xl font-bold uppercase mb-4">Order Summary</h4>
        {product ? (
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <img
                src={product.img}
                alt={product.name}
                className="w-20 h-20 object-cover rounded"
              />
              <div>
                <h5 className="font-semibold">{product.name}</h5>
                <p className="text-sm text-gray-500">Qty: {product.quantity || 1}</p>
                <p className="font-bold">${product.price}</p>
              </div>
            </div>
            <div className="divider"></div>
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${product.price}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>$19</span>
            </div>
            <div className="divider"></div>
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>${(product.price || 0) + 19}</span>
            </div>
          </div>
        ) : (
          <p className="text-gray-500">No product selected from cart.</p>
        )}
      </div>
    </div>
    </>
  );
};

export default Checkout;
