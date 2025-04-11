import { TMeta } from "@/types/common";
import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const galleryApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createGallery: build.mutation({
      query: (data) => ({
        url: "/gallery",
        method: "POST",
        contentType: "application/json",
        data,
      }),
      invalidatesTags: [tagTypes.gallery],
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
   
  }),
});

export const {
 useCreateGalleryMutation
} = galleryApi;
