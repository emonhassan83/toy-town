import baseApi from "../../api/baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    saveUser: builder.mutation({
      query: ({ userData, email }) => ({
        url: `/user/${email}`,
        method: "PUT",
        body: userData,
      }),
    }),

    getUsers: builder.query({
      query: () => "/users",
      providesTags: ["Users"],
    }),

    getUser: builder.query({
      query: (email) => `/users/${email}`,
    }),

    updateUser: builder.mutation({
      query: ({email, userData}) => ({
        url: `/user/${email}`,
        method: "PUT",
        body: userData,
      }),
      invalidatesTags: ["Users"],
    }),

    makeUser: builder.mutation({
      query: (id) => ({
        url: `/users/user/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Users"],
    }),

    makeSeller: builder.mutation({
      query: (id) => ({
        url: `/users/seller/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Users"],
      // options: {
      //   fetchBaseQuery: {
      //     // Replace with your server's URL
      //     baseUrl: "http://localhost:5000",
      //     // Include credentials: "include" if necessary
      //     credentials: "include",
      //     // Additional headers if needed (e.g., authorization headers)
      //     // headers: {
      //     //   Authorization: `Bearer ${yourAccessToken}`,
      //     // },
      //   },
      // },
    }),

    makeAdmin: builder.mutation({
      query: (id) => ({
        url: `/users/admin/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Users"],
    }),
    
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/users/user/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Users"],
    }),
  }),
});

export const {
  useSaveUserMutation,
  useGetUsersQuery,
  useGetUserQuery,
  useUpdateUserMutation,
  useMakeUserMutation,
  useMakeSellerMutation,
  useMakeAdminMutation,
  useDeleteUserMutation,
} = userApi;
