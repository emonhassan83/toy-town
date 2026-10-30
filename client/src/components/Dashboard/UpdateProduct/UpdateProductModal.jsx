import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useGetUserQuery } from "../../../redux/features/user/userApi";
import { useUpdateProductMutation } from "../../../redux/features/products/productsApi";

const UpdateProductModal = ({ product, isOpen, closeModal }) => {
  const { email } = useSelector((state) => state.userSlice);
  const { data: user } = useGetUserQuery(email);
  const [updateProduct, {data:updateData, error}] = useUpdateProductMutation();
  console.log(updateData, error);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const url = `https://api.imgbb.com/1/upload?key=${
    import.meta.env.VITE_IMGBB_KEY
  }`;

  const onSubmit = (data) => {
    //Image upload
    const formData = new FormData();
    formData.append("image", data.img[0]);

    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imageData) => {
        const img = imageData.data.url;

        // Generate a unique SKU number
        const prefix = "PROD"; // You can customize the prefix
        const randomPart = Math.floor(Math.random() * 10000); // Generate a random number (adjust the range as needed)
        const timestampPart = Date.now(); // Get the current timestamp

        // Combine the parts to create the SKU
        const SKU = `${prefix}-${randomPart}-${timestampPart}`;
        //save product to database
        const updatedFormData = {
          ...data,
          img,
          seller_email: email,
          details_img: "https://imgpile.com/images/DxHwxw.jpg",
          SKU,
          ...(user.role === "seller" ? { status: "pending" } : {}),
          reviews: [],
        };
        const options = {
          id: product._id,
          updateData: updatedFormData
        };

        // Update product
        updateProduct(options);

        toast.success("Product updated successfully");
        closeModal();
      });
  };
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-3xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium text-center leading-6 text-gray-900"
                >
                  Update a Product!!!
                </Dialog.Title>
                <hr className="my-6" />
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="sm:flex items-center sm:gap-2 lg:gap-8">
                    <div className="w-full">
                      <label>Product Name</label>
                      <input
                        type="text"
                        className="italic"
                        defaultValue={product?.product_name}
                        placeholder="Product Name"
                        {...register("product_name")}
                      />
                    </div>

                    <div className="w-full">
                      <label className="text-xs sm:text-sm">
                        Product Photo
                      </label>
                      <input
                        required
                        type="file"
                        accept="image/*"
                        {...register("img")}
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-2 lg:gap-8">
                    <div className="w-full">
                      <label>Product Category</label>
                      <input
                        type="text"
                        className="italic"
                        defaultValue={product?.product_category}
                        placeholder="Product Category"
                        {...register("product_category", { required: true })}
                      />
                    </div>

                    <div className="w-full">
                      <label>Quantity</label>
                      <input
                        type="text"
                        className="italic"
                        defaultValue={product?.quantity}
                        placeholder="Product quantity"
                        {...register("quantity", { required: true })}
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-2 lg:gap-8">
                    <div className="w-full">
                      <label>Tags</label>
                      <input
                        type="text"
                        className="italic"
                        placeholder="Tags"
                        defaultValue={product?.tags}
                        {...register("tags", { required: true })}
                      />
                    </div>

                    <div className="w-full">
                      <label>Price</label>
                      <input
                        type="text"
                        className="italic"
                        placeholder="Price"
                        defaultValue={product?.price}
                        {...register("price")}
                      />
                      {errors.price && (
                        <span className="text-sky-500 text-xs font-semibold">
                          This field is required
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 lg:gap-8">
                    <div className="w-full">
                      <label>Variant</label>
                      <input
                        type="text"
                        className="italic"
                        placeholder="Variant"
                        defaultValue={product?.variant}
                        {...register("variant", { required: true })}
                      />
                    </div>

                    <div className="w-full">
                      <label>Color</label>
                      <input
                        type="text"
                        className="italic"
                        placeholder="Color"
                        defaultValue={product?.color}
                        {...register("color")}
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-2 lg:gap-8">
                    <div className="w-full">
                      <label>Material</label>
                      <input
                        type="text"
                        className="italic"
                        placeholder="Material"
                        defaultValue={product?.material}
                        {...register("material", { required: true })}
                      />
                    </div>

                    <div className="w-full">
                      <label>Brand</label>
                      <input
                        type="text"
                        className="italic"
                        placeholder="Brand Name"
                        defaultValue={product?.brand}
                        {...register("brand")}
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-2 lg:gap-8">
                    <div className="w-full">
                      <label>Collection</label>
                      <input
                        type="text"
                        className="italic"
                        placeholder="Collection Time"
                        defaultValue={product?.collection}
                        {...register("collection", { required: true })}
                      />
                    </div>

                    <div className="w-full">
                      <label>Weight</label>
                      <input
                        type="text"
                        className="italic"
                        placeholder="Product Weight"
                        defaultValue={product?.weight}
                        {...register("weight")}
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-2 lg:gap-8">
                    <div className="w-full">
                      <label>Base Type</label>
                      <input
                        type="text"
                        className="italic"
                        placeholder="Base Type"
                        defaultValue={product?.base_type}
                        {...register("base_type")}
                      />
                    </div>

                    <div className="w-full">
                      <label>Category</label>
                      <input
                        required
                        type="text"
                        placeholder="Category Name"
                        defaultValue={product?.category}
                        {...register("category")}
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-2 lg:gap-8">
                    <div className="w-full">
                      <label>Seller Name</label>
                      <input
                        type="text"
                        className="italic"
                        defaultValue={product?.seller}
                        placeholder="Seller Name"
                        {...register("seller", { required: true })}
                      />
                    </div>

                    <div className="w-full">
                      <label>Ratings</label>
                      <input
                        type="text"
                        className="italic"
                        placeholder="Ratings"
                        defaultValue={product?.rating}
                        {...register("rating")}
                      />
                    </div>
                  </div>
                  <div className="w-full">
                    <label>Detail description</label>
                    <input
                      className="pb-10 italic"
                      placeholder="Detail description"
                      defaultValue={product?.description}
                      {...register("description")}
                    />
                  </div>
                  {errors.toyName && <span>This field is required</span>}

                  <input
                    type="submit"
                    value="Add A Product"
                    className="btn  bg-pink-500 hover:bg-pink-600 border-none w-40 rounded-3xl"
                  />
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default UpdateProductModal;
