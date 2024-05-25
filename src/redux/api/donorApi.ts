import { TMeta } from "@/types/common";
import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const donorApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    //     createDoctor: build.mutation({
    //       query: (data) => ({
    //         url: "/user/create-doctor",
    //         method: "POST",
    //         contentType: "multipart/form-data",
    //         data,
    //       }),
    //       invalidatesTags: [tagTypes.doctor],
    //     }),
    getAllDonors: build.query({
      query: (arg: Record<string, any>) => ({
        url: "/donor",
        method: "GET",
        params: arg,
      }),
      transformResponse: (response: any, meta: TMeta) => {
        return {
          doctors: response,
          meta,
        };
      },
      providesTags: [tagTypes.donor],
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

export const { useGetAllDonorsQuery } = donorApi;
