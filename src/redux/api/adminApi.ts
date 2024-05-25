import { TMeta } from "@/types/common";
import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const adminApi = baseApi.injectEndpoints({
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
    getAllAdmin: build.query({
      query: (arg: Record<string, any>) => ({
        url: "/admin",
        method: "GET",
        params: arg,
      }),
      transformResponse: (response: any, meta: TMeta) => {
        return {
          admin: response,
          meta,
        };
      },
      providesTags: [tagTypes.admin],
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

export const { useGetAllAdminQuery } = adminApi;
