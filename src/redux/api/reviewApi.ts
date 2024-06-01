import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

export const reviewApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllReview: build.query({
      query: (arg: Record<string, any>) => ({
        url: "/review",
        method: "GET",
        params: arg,
      }),
      transformResponse: (response: any) => {
        return {
          review: response,
        };
      },
      providesTags: [tagTypes.review],
    }),
    giveReview: build.mutation({
      query: (data) => ({
        url: "/review",
        method: "POST",
        contentType: "application/json",
        data,
      }),
      invalidatesTags: [tagTypes.review],
    }),
  }),
});

export const { useGetAllReviewQuery, useGiveReviewMutation } = reviewApi;
