import { TMeta } from "@/types/common";
import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const requestApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createBloodRequest: build.mutation({
      query: (data) => ({
        url: "/request",
        method: "POST",
        contentType: "application/json",
        data,
      }),
      invalidatesTags: [tagTypes.request],
    }),
    getAllMyBloodRequest: build.query({
      query: (arg: Record<string, any>) => ({
        url: "/request/my",
        method: "GET",
        params: arg,
      }),
      transformResponse: (response: any, meta: TMeta) => {
        return {
          myRequest: response,
          meta,
        };
      },
      providesTags: [tagTypes.request],
    }),
    getAllOfferedMeRequest: build.query({
      query: (arg: Record<string, any>) => ({
        url: "/request/me",
        method: "GET",
        params: arg,
      }),

      providesTags: [tagTypes.request],
    }),
    offeredMeRequestUpdate: build.mutation({
      query: (data) => ({
        url: `/request/status/${data.id}?status=${data.value}`,
        method: "PATCH",
      }),
      invalidatesTags: [tagTypes.request],
    }),
  }),
});

export const {
  useCreateBloodRequestMutation,
  useGetAllOfferedMeRequestQuery,
  useGetAllMyBloodRequestQuery,
  useOfferedMeRequestUpdateMutation,
} = requestApi;
