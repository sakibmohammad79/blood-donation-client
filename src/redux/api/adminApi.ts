import { TMeta } from "@/types/common";
import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const adminApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
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
    adminStatusUpdate: build.mutation({
      query: (data) => ({
        url: `/admin/status/${data.id}?status=${data.value}`,
        method: "PATCH",
      }),
      invalidatesTags: [tagTypes.user, tagTypes.admin],
    }),
  }),
});

export const { useGetAllAdminQuery, useAdminStatusUpdateMutation } = adminApi;
