import { baseApi } from "@/redux/api/baseApi";
import { setUser, setToken } from "./authSlice";

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled;
          const token = data?.data?.token;

          if (token) {
            dispatch(setToken(token));
          }
        } catch (err) {
          console.error("Login failed", err);
        }
      },
    }),

    getProfile: build.query({
      query: () => "/users/get-me",
      providesTags: ["Auth"],
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled;
          if (data?.data) {
            dispatch(setUser(data.data));
          }
        } catch (err) {
          console.error("Fetching profile failed", err);
        }
      },
    }),
  }),
});

export const { useLoginMutation, useGetProfileQuery } = authApi;
