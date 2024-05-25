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
      transformResponse: (response: any, meta: TMeta) => {
        return {
          requestMe: response,
          meta,
        };
      },
      providesTags: [tagTypes.request],
    }),
    // getSingleDoctor: build.query({
    //   query: (id: string) => ({
    //     url: `/doctor/${id}`,
    //     method: "GET",
    //   }),
    //   providesTags: [tagTypes.doctor],
    // }),
    // deleteDoctor: build.mutation({
    //   query: (id: string) => ({
    //     url: `/doctor/soft/${id}`,
    //     method: "PATCH",
    //   }),
    //   invalidatesTags: [tagTypes.doctor],
    // }),
    // updateDoctor: build.mutation({
    //   query: (data) => ({
    //     url: `/doctor/${data.id}`,
    //     method: "PATCH",
    //     data: data.body,
    //   }),
    //   invalidatesTags: [tagTypes.doctor, tagTypes.user],
    // }),
  }),
});

export const {
  useCreateBloodRequestMutation,
  useGetAllMyBloodRequestQuery,
  useGetAllOfferedMeRequestQuery,
} = requestApi;
