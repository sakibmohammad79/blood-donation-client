import { TMeta } from "@/types/common";
import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const volunteerApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createVolunteer: build.mutation({
      query: (data) => ({
        url: "/volunteer/create-volunteer",
        method: "POST",
        contentType: "application/json",
        data,
      }),
      invalidatesTags: [tagTypes.volunteer],
    }),
    getAllVolunteer: build.query({
      query: (arg: Record<string, any>) => ({
        url: "/volunteer",
        method: "GET",
        params: arg,
      }),
      transformResponse: (response: any, meta: TMeta) => {
        return {
          volunteer: response,
          meta,
        };
      },
      providesTags: [tagTypes.admin],
    }),
    // getSingleAdmin: build.query({
    //   query: (id) => ({
    //     url: `/admin/${id}`,
    //     method: "GET",
    //   }),
    //   providesTags: [tagTypes.admin],
    // }),
    // adminStatusUpdate: build.mutation({
    //   query: (data: any) => ({
    //     url: `/admin/status/${data.id}?status=${data.value}`,
    //     method: "PATCH",
    //   }),
    //   invalidatesTags: [tagTypes.user, tagTypes.admin],
    // }),
    // adminUpdate: build.mutation({
    //   query: (data) => ({
    //     url: `/admin/${data.id}`,
    //     method: "PATCH",
    //     data: data.body,
    //   }),
    //   invalidatesTags: [tagTypes.admin, tagTypes.user],
    // }),
    // deleteAdmin: build.mutation({
    //   query: (id) => ({
    //     url: `/admin/soft-delete/${id}`,
    //     method: "PATCH",
    //   }),
    //   invalidatesTags: [tagTypes.admin, tagTypes.user],
    // }),
  }),
});

export const {
  useCreateVolunteerMutation,
  useGetAllVolunteerQuery
} = volunteerApi;
