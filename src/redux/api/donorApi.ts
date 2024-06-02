import { TMeta } from "@/types/common";
import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const donorApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllDonors: build.query({
      query: (arg: Record<string, any>) => ({
        url: "/donor/all-donor",
        method: "GET",
        params: arg,
      }),
      transformResponse: (response: any, meta: TMeta) => {
        return {
          donor: response,
          meta,
        };
      },
      providesTags: [tagTypes.donor],
    }),
    getAllDonorsWithoutMe: build.query({
      query: (arg: Record<string, any>) => ({
        url: "/donor",
        method: "GET",
        params: arg,
      }),
      transformResponse: (response: any, meta: TMeta) => {
        return {
          donor: response,
          meta,
        };
      },
      providesTags: [tagTypes.donor],
    }),
    getSingleDonor: build.query({
      query: (id) => ({
        url: `/donor/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.donor],
    }),
    donorStatusUpdate: build.mutation({
      query: (data) => ({
        url: `/donor/status/${data.id}?status=${data.value}`,
        method: "PATCH",
      }),
      invalidatesTags: [tagTypes.user, tagTypes.donor],
    }),
    donorUpdate: build.mutation({
      query: (data) => ({
        url: `/donor/${data.id}`,
        method: "PATCH",
        data: data.data,
      }),
      invalidatesTags: [tagTypes.donor, tagTypes.user],
    }),
    deleteDonor: build.mutation({
      query: (id) => ({
        url: `/donor/soft-delete/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: [tagTypes.donor, tagTypes.user],
    }),
  }),
});

export const {
  useGetAllDonorsQuery,
  useDonorStatusUpdateMutation,
  useGetSingleDonorQuery,
  useDonorUpdateMutation,
  useDeleteDonorMutation,
  useGetAllDonorsWithoutMeQuery,
} = donorApi;
