import { baseApi } from "@/redux/api/baseApi";

export const usersApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    fetchUsers: build.query({
      query: () => "users",
      providesTags: [{ type: "User", id: "LIST" }],
    }),

    getUserById: build.query({
      query: (id) => `users/${id}`,
      providesTags: [{ type: "User", id: "SINGLE" }],
    }),

    updateUser: build.mutation({
      query: ({ id, ...patch }) => ({
        url: `users/${id}`,
        method: "PATCH",
        body: patch,
      }),
      invalidatesTags: [{ type: "User", id: "SINGLE" }],
    }),
  }),
});

export const {
  useFetchUsersQuery,
  useGetUserByIdQuery,
  useUpdateUserMutation,
} = usersApi;
