import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";
const AUTH_URL = "/auth";

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    //   userLogin: build.mutation({
    //      query: (loginData) => ({
    //         url: `${AUTH_URL}/login`,
    //         method: 'POST',
    //         data: loginData,
    //      }),
    //      invalidatesTags: [tagTypes.user],
    //   }),
    changePassword: build.mutation({
      query: (data) => ({
        url: `${AUTH_URL}/password-change`,
        method: "POST",
        contentType: "application/json",
        data: data,
      }),
      invalidatesTags: [tagTypes.user],
    }),
  }),
});

export const { useChangePasswordMutation } = authApi;
