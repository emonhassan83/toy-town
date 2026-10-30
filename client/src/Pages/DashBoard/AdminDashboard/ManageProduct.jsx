import toast, { Toaster } from "react-hot-toast";
import {
  useApproveProductMutation,
  useDeleteProductMutation,
  useGetProductsQuery,
} from "../../../redux/features/products/productsApi";
import UpdateProductModal from "../../../components/Dashboard/UpdateProduct/UpdateProductModal";
import { useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import useTitle from "../../../hooks/useTitle";

const ManageProduct = () => {
  const { data: products, isLoading, error } = useGetProductsQuery();
  const [deleteProduct] = useDeleteProductMutation();
  const [approveProduct] = useApproveProductMutation();
  const [isOpen, setIsOpen] = useState(false);
  // Use tile by custom useTitle Hook
  useTitle("Manage Products");

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleDeleteProduct = (productId) => {
    deleteProduct(productId);
    toast.success("Product deleted successfully");
  };

  const handleApproveProduct = (productId) => {
    approveProduct(productId);
    toast.success("Product approve successfully");
  };

  return (
    <div>
      <Toaster />
      {error && <p className="text-red-500 mt-[35vh]">{error.message}</p>}
      {products && products?.length > 0 && Array.isArray(products) && (
        <div className="overflow-x-auto">
          <table className="table" style={{ width: "100%" }}>
            {/* head */}
            <thead>
              <tr>
                <th>SL</th>
                <th>product Image</th>
                <th>Product Name</th>
                <th>Seller Name</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Status</th>
                <th>Action</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {products?.map((product, index) => (
                <tr key={product._id}>
                  <td>{index + 1}</td>
                  <td>
                    <div className="flex items-center space-x-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img
                            src={product?.img}
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>{product.product_name}</td>
                  <td>{product?.seller}</td>
                  <td className="text-center">{product?.quantity}</td>
                  <td>${product?.price}</td>
                  <td>
                    {product?.status === "pending" ? "pending" : "approved"}
                  </td>
                  <td>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleApproveProduct(product._id)}
                        className="btn btn-xs btn-color border-none"
                      >
                        Approved
                      </button>
                      <button
                        onClick={() => setIsOpen(true)}
                        className="btn btn-xs btn-color border-none"
                      >
                        Update
                      </button>
                      <UpdateProductModal
                        product={product}
                        isOpen={isOpen}
                        closeModal={closeModal}
                      />
                    </div>
                  </td>
                  <td>
                    <button
                      onClick={() => handleDeleteProduct(product._id)}
                      className="text-[#22889c] pl-3"
                    >
                      <RiDeleteBin6Line className=" w-6 h-5 mx-auto" />
                    </button>
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

export default ManageProduct;
