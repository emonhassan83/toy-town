import baseApi from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    saveToken: builder.mutation({
      query: (tokenData) => ({
        url: "/jwt",
        method: "POST",
        body: tokenData,
      }),
    }),
  }),
});

export const { useSaveTokenMutation } = authApi;
