import { baseApi } from "@/redux/api/baseApi";

export const fileUploadApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    uploadFile: build.mutation({
      query: (body) => ({
        url: `/file-uploads/files`,
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useUploadFileMutation } = fileUploadApi;
