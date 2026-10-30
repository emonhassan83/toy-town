import baseApi from "../../api/baseApi";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    saveProduct: builder.mutation({
      query: (product) => ({
        url: "/saveProduct",
        method: "POST",
        body: product,
      }),
      invalidatesTags: ["Product"],
    }),

    paymentProduct: builder.mutation({
      query: (productData) => ({
        url: "/payment",
        method: "POST",
        body: productData,
      }),
      invalidatesTags: ["Payment", "Cart", "Product"],
    }),

    getProducts: builder.query({
      query: () => "/allProducts",
      providesTags: ["Product"],
    }),

    getProductsByCategory: builder.query({
      query: (category) => `/allProducts/${category}`,
      providesTags: ["Product"],
    }),

    getProductsById: builder.query({
      query: (id) => `/productDetails/${id}`,
      providesTags: ["Product"],
    }),

    getProductsByEmail: builder.query({
      query: (email) => `/myProducts/${email}`,
      providesTags: ["Product"],
    }),

    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/deleteProduct/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Product"],
    }),

    deleteCartProduct: builder.mutation({
      query: (id) => ({
        url: `/deleteCartProduct/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Cart"],
    }),

    updateProduct: builder.mutation({
      query: ({ id, productData }) => ({
        url: `/updateProduct/${id}`,
        method: "PATCH",
        body: productData,
      }),
      invalidatesTags: ["Product"],
    }),

    saveCartProduct: builder.mutation({
      query: (product) => ({
        url: "/cartProduct",
        method: "POST",
        body: product,
      }),
      invalidatesTags: ["Cart"],
    }),

    saveReviewProduct: builder.mutation({
      query: (product) => ({
        url: "/reviewProduct",
        method: "POST",
        body: product,
      }),
      invalidatesTags: ["Review", "Product"],
    }),

    getReviewProduct: builder.query({
      query: (id) => `/reviewProduct/${id}`,
      providesTags: ["Review"],
    }),

    getCartProducts: builder.query({
      query: (email) => `/cartProducts/${email}`,
      providesTags: ["Cart"],
    }),
    
    getPaymentProduct: builder.query({
      query: (email) => `/payment/${email}`,
      providesTags: ["Payment"],
    }),

    approveProduct: builder.mutation({
      query: (id) => ({
        url: `/approveProduct/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Product"],
    }),
  }),
});

export const {
  useSaveProductMutation,
  useGetProductsQuery,
  useGetProductsByCategoryQuery,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetProductsByIdQuery,
  useSaveCartProductMutation,
  useGetCartProductsQuery,
  useDeleteCartProductMutation,
  usePaymentProductMutation,
  useGetPaymentProductQuery,
  useGetProductsByEmailQuery,
  useApproveProductMutation,
  useSaveReviewProductMutation,
  useGetReviewProductQuery,
} = productApi;
