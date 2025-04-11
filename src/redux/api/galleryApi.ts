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
    getAllGallery: build.query({
      query: (arg: Record<string, any>) => ({
        url: "/gallery",
        method: "GET",
        params: arg,
      }),
      transformResponse: (response: any, meta: TMeta) => {
        return {
          gallery: response,
          meta,
        };
      },
      providesTags: [tagTypes.gallery],
    }),
   
  }),
});

export const {
 useCreateGalleryMutation,
 useGetAllGalleryQuery
} = galleryApi;
