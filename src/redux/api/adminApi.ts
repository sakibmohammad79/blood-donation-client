import { TMeta } from "@/types/common";
import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const adminApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createAdmin: build.mutation({
      query: (data) => ({
        url: "/user/create-admin",
        method: "POST",
        contentType: "application/json",
        data,
      }),
      invalidatesTags: [tagTypes.admin],
    }),
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
    getSingleAdmin: build.query({
      query: (id) => ({
        url: `/admin/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.admin],
    }),
    adminStatusUpdate: build.mutation({
      query: (data: any) => ({
        url: `/admin/status/${data.id}?status=${data.value}`,
        method: "PATCH",
      }),
      invalidatesTags: [tagTypes.user, tagTypes.admin],
    }),
    adminUpdate: build.mutation({
      query: (data) => ({
        url: `/admin/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [tagTypes.admin, tagTypes.user],
    }),
    deleteAdmin: build.mutation({
      query: (id) => ({
        url: `/admin/soft-delete/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: [tagTypes.admin, tagTypes.user],
    }),
  }),
});

export const {
  useGetAllAdminQuery,
  useAdminStatusUpdateMutation,
  useAdminUpdateMutation,
  useGetSingleAdminQuery,
  useDeleteAdminMutation,
  useCreateAdminMutation,
} = adminApi;
