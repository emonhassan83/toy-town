import { useForm } from "react-hook-form";
import { useSaveProductMutation } from "../../../redux/features/products/productsApi";
import toast, { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import useTitle from "../../../hooks/useTitle";

const AddProduct = () => {
  const { email, name } = useSelector((state) => state.userSlice);
  const [saveProduct] = useSaveProductMutation();
  // Use tile by custom useTitle Hook
  useTitle("Add Product");

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
        const productData = {
          ...data,
          img,
          seller_email: email,
          details_img: 'https://imgpile.com/images/DxHwxw.jpg',
          SKU,
          status: 'pending',
          reviews: []
        };
        // save product
        saveProduct(productData);
        toast.success('Product saved successfully')
      });
  };

  return (
    <div>
      <Toaster/>
      <h2 className="text-2xl primary-font text-center mt-4">Add A Toy Section</h2>
      <p className="text-base secondary-font my-6 text-gray-600 text-center italic">
        Welcome to Add-A-Toy, your one-stop destination for a world <br /> of
        play and wonder. Explore our vast collection of toys
      </p>
      <div className="border-2 p-4 sm:p-6 md:p-10 rounded-xl">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="sm:flex items-center sm:gap-2 lg:gap-8">
            <div className="w-full">
              <label>Product Name</label>
              <input
                type="text"
                className="italic"
                placeholder="Product Name"
                {...register("product_name", { required: true })}
              />
              {errors.product_name && <span className="text-sky-500 text-xs">This field is required</span>}
            </div>

            <div className="w-full">
              <label className="text-xs sm:text-sm">Product Photo</label>
              <input
                required
                type="file"
                accept="image/*"
                {...register("img", { required: true })}
              />
              {errors.img && <span className="text-sky-500 text-xs">This field is required</span>}
            </div>
          </div>
          <div className="sm:flex items-center gap-2 lg:gap-8">
            <div className="w-full">
              <label>Product Category</label>
              <input
                type="text"
                className="italic"
                placeholder="Product Category"
                {...register("product_category", { required: true })}
              />
              {errors.product_category && <span className="text-sky-500 text-xs">This field is required</span>}
            </div>

            <div className="w-full">
              <label>Quantity</label>
              <input
                type="text"
                className="italic"
                placeholder="Product quantity"
                {...register("quantity", { required: true })}
              />
              {errors.quantity && <span className="text-sky-500 text-xs">This field is required</span>}
            </div>
          </div>
          <div className="sm:flex items-center gap-2 lg:gap-8">
            <div className="w-full">
              <label>Tags</label>
              <input
                type="text"
                className="italic"
                placeholder="Tags"
                {...register("tags", { required: true })}
              />
              {errors.quantity && <span className="text-sky-500 text-xs">This field is required</span>}
            </div>

            <div className="w-full">
              <label>Price</label>
              <input
                type="text"
                className="italic"
                placeholder="Price"
                {...register("price", { required: true })}
              />
              {errors.price && (
                <span className="text-sky-500 text-xs font-semibold">
                  This field is required
                </span>
              )}
            </div>
          </div>
          <div className="sm:flex items-center gap-2 lg:gap-8">
            <div className="w-full">
              <label>Variant</label>
              <input
                type="text"
                className="italic"
                placeholder="Variant"
                {...register("variant", { required: true })}
              />
              {errors.variant && <span className="text-sky-500 text-xs">This field is required</span>}
            </div>

            <div className="w-full">
              <label>Color</label>
              <input
                type="text"
                className="italic"
                placeholder="Color"
                {...register("color", { required: true })}
              />
              {errors.color && <span className="text-sky-500 text-xs">This field is required</span>}
            </div>
          </div>
          <div className="sm:flex items-center gap-2 lg:gap-8">
            <div className="w-full">
              <label>Material</label>
              <input
                type="text"
                className="italic"
                placeholder="Material"
                {...register("material", { required: true })}
              />
              {errors.material && <span className="text-sky-500 text-xs">This field is required</span>}
            </div>

            <div className="w-full">
              <label>Brand</label>
              <input
                type="text"
                className="italic"
                placeholder="Brand Name"
                {...register("brand", { required: true })}
              />
              {errors.brand && <span className="text-sky-500 text-xs">This field is required</span>}
            </div>
          </div>
          <div className="sm:flex items-center gap-2 lg:gap-8">
            <div className="w-full">
              <label>Collection</label>
              <input
                type="text"
                className="italic"
                placeholder="Collection Time"
                {...register("collection", { required: true })}
              />
              {errors.collection && <span className="text-sky-500 text-xs">This field is required</span>}
            </div>

            <div className="w-full">
              <label>Weight</label>
              <input
                type="text"
                className="italic"
                placeholder="Product Weight"
                {...register("weight", { required: true })}
              />
              {errors.weight && <span className="text-sky-500 text-xs">This field is required</span>}
            </div>
          </div>
          <div className="sm:flex items-center gap-2 lg:gap-8">
            <div className="w-full">
              <label>Base Type</label>
              <input
                type="text"
                className="italic"
                placeholder="Base Type"
                {...register("base_type", { required: true })}
              />
              {errors.base_type && <span className="text-sky-500 text-xs">This field is required</span>}
            </div>

            <div className="w-full">
              <label>Category</label>
              <input
                required
                type="text"
                placeholder="Category Name"
                {...register("category", { required: true })}
              />
              {errors.category && <span className="text-sky-500 text-xs">This field is required</span>}
            </div>
          </div>
          <div className="sm:flex items-center gap-2 lg:gap-8">
            <div className="w-full">
              <label>Seller Name</label>
              <input
                type="text"
                className="italic"
                defaultValue={name}
                placeholder="Seller Name"
                {...register("seller", { required: true })}
              />
              {errors.seller && <span className="text-sky-500 text-xs">This field is required</span>}
            </div>

            <div className="w-full">
              <label>Ratings</label>
              <input
                type="text"
                className="italic"
                placeholder="Ratings"
                {...register("rating", { required: true })}
              />
              {errors.rating && <span className="text-sky-500 text-xs">This field is required</span>}
            </div>
          </div>
          <div className="w-full">
            <label>Detail description</label>
            <input
              className="pb-10 italic"
              placeholder="Detail description"
              {...register("description", { required: true })}
            />
            {errors.seller && <span className="text-sky-500 text-xs">This field is required</span>}
          </div>
          {errors.rating && <span className="text-sky-500 text-xs">This field is required</span>}

          <input
            type="submit"
            value="Add A Product"
            className="btn btn-color border-none btn-block rounded-3xl"
          />
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
