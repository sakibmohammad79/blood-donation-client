import { TMeta } from "@/types/common";
import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const donorApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllDonors: build.query({
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
    donorStatusUpdate: build.mutation({
      query: (data) => ({
        url: `/donor/status/${data.id}?status=${data.value}`,
        method: "PATCH",
      }),
      invalidatesTags: [tagTypes.user, tagTypes.donor],
    }),
  }),
});

export const { useGetAllDonorsQuery, useDonorStatusUpdateMutation } = donorApi;
