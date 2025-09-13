import { baseApi } from "@/redux/api/baseApi";

export const usersApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    fetchUsers: build.query({
      query: (params = {}) => ({
        url: "/users/all-users",
        method: "GET",
        params,
      }),
      providesTags: ["User"],
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
    deleteUser: build.mutation({
      query: (id) => ({
        url: `/users/delete/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useFetchUsersQuery,
  useGetUserByIdQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = usersApi;
