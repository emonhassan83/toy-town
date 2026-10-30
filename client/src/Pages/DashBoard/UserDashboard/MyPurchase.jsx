import { useSelector } from "react-redux";
import { useGetPaymentProductQuery } from "../../../redux/features/products/productsApi";
import useTitle from "../../../hooks/useTitle";

const MyPurchase = () => {
  const { email } = useSelector((state) => state.userSlice);
  const { data: products, isLoading, error } = useGetPaymentProductQuery(email);
  // Use tile by custom useTitle Hook
  useTitle("My Purchase");

  return (
    <>
      <h4 className="text-2xl text-center my-4 uppercase">My Purchase</h4>
      {error && <p className="text-red-500 mt-[35vh]">{error.message}</p>}
      {products && products?.length > 0 && Array.isArray(products) && (
        <div className="overflow-x-auto">
          <table className="table w-[100%]">
            <thead>
              <tr>
                <th>SL</th>
                <th>Product Image</th>
                <th>Product Name</th>
                <th>User Name</th>
                <th>Product Price</th>
                <th>Purchase Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {products &&
                products.length > 0 &&
                products.map((product, index) => (
                  <tr key={product._id}>
                    <td>{index + 1}</td>

                    <td>
                      <div className="flex items-center space-x-3">
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
                            <img
                              src={product?.product_img}
                              alt="Product Image"
                            />
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>{product?.product_name}</td>
                    <td>{product?.userName}</td>
                    <td>{product?.price}</td>
                    <td className="text-center">{product?.date}</td>
                    <td>Purchased</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default MyPurchase;
