import baseApi from "../../api/baseApi";

const feedbackApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    saveFeedback: builder.mutation({
      query: (feedbackData) => ({
        url: "/feedback",
        method: "POST",
        body: feedbackData,
      }),
      invalidatesTags: ["Feedback"],
    }),
    getFeedback: builder.query({
      query: () => "/feedbacks",
      providesTags: ["Feedback"],
    }),
  }),
});

export const { useSaveFeedbackMutation, useGetFeedbackQuery } = feedbackApi;
