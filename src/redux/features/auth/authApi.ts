import { baseApi } from "@/redux/api/baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["Auth"],
    }),

    getProfile: build.query({
      query: () => "/users/get-me",
      providesTags: ["Auth"],
    }),
  }),
  overrideExisting: false,
});

export const { useLoginMutation, useGetProfileQuery } = authApi;
