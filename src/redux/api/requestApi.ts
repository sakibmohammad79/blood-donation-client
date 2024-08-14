import { TMeta } from "@/types/common";
import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const requestApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    allBloodRequest: build.query({
      query: () => ({
        url: "/request",
        method: "GET",
      }),
      providesTags: [tagTypes.request],
    }),
    allApprovedBloodRequest: build.query({
      query: () => ({
        url: "/request/approved",
        method: "GET",
      }),
      providesTags: [tagTypes.request],
    }),
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
    getSingleBloodRequestReceiver: build.query({
      query: (id) => ({
        url: `/request/${id}`,
        method: "GET",
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
  useAllBloodRequestQuery,
  useAllApprovedBloodRequestQuery,
  useCreateBloodRequestMutation,
  useGetAllOfferedMeRequestQuery,
  useGetAllMyBloodRequestQuery,
  useOfferedMeRequestUpdateMutation,
  useGetSingleBloodRequestReceiverQuery,
} = requestApi;
