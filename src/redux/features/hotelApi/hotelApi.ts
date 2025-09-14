import { baseApi } from "@/redux/api/baseApi";

export const hotelsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    crateSingleRestaurant: build.mutation({
      query: (body) => ({
        url: `/restourants/create`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Restaurants"],
    }),
    getAllRestaurants: build.query({
      query: (params = {}) => ({
        url: `/restourants`,
        method: "GET",
        params,
      }),
      providesTags: ["Restaurants"],
    }),
    getSingleRestaurant: build.query({
      query: (id) => ({
        url: `/restourants/${id}`,
        method: "GET",
      }),
      providesTags: ["Restaurants"],
    }),
    updateSingleRestaurant: build.mutation({
      query: ({ id, body }) => ({
        url: `/restourants/update/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Restaurants"],
    }),
    deleteSingleRestaurant: build.mutation({
      query: (id) => ({
        url: `/restourants/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Restaurants"],
    }),
  }),
});

export const {
  useCrateSingleRestaurantMutation,
  useGetAllRestaurantsQuery,
  useGetSingleRestaurantQuery,
  useUpdateSingleRestaurantMutation,
  useDeleteSingleRestaurantMutation,
} = hotelsApi;
