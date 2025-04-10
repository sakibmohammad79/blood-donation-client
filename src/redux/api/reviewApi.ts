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
    deleteReview: build.mutation({
      query: (id) => ({
        url: `/review/delete-review/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.review],
    }),
    approvedReview: build.mutation({
      query: (id) => ({
        url: `/review/approved-review/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: [tagTypes.review],
    }),
  }),
});

export const { useGetAllReviewQuery, useGiveReviewMutation, useDeleteReviewMutation, useApprovedReviewMutation } = reviewApi;
