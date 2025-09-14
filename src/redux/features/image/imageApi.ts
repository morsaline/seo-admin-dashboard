import { baseApi } from "@/redux/api/baseApi";

export const imagesApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    crateSingleUploadFile: build.mutation({
      query: (body) => ({
        url: `/file-uploads/upload-single`,
        method: "POST",
        body,
      }),
    }),
    crateMultipleUploadFile: build.mutation({
      query: (body) => ({
        url: `/file-uploads/files`,
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useCrateSingleUploadFileMutation,
  useCrateMultipleUploadFileMutation,
} = imagesApi;
