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
      providesTags: [tagTypes.volunteer],
    }),
    activeVolunteer: build.mutation({
      query: (id) => ({
        url: `/volunteer/active-volunteer/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: [tagTypes.volunteer],
    }),
    inactiveVolunteer: build.mutation({
      query: (id) => ({
        url: `/volunteer/inactive-volunteer/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: [tagTypes.volunteer],
    }),
    deleteVolunteer: build.mutation({
      query: (id) => ({
        url: `/volunteer/delete-volunteer/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.volunteer],
    }),
  }),
});

export const {
  useCreateVolunteerMutation,
  useGetAllVolunteerQuery,
 useDeleteVolunteerMutation,
 useActiveVolunteerMutation,
 useInactiveVolunteerMutation
} = volunteerApi;
