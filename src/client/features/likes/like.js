import api from "../../store/api";

const likesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getLikes: builder.query({
      query: () => "/likes",
      providesTags: ["Likes"],
    }),
    createLike: builder.mutation({
      query: (message) => ({
        url: `/likes/${message.id}/like`,
        method: "POST",
        body: userID,
      }),
      invalidatesTags: ["Likes"],
    }),
    deleteLike: builder.mutation({
      query: (message, user) => ({
        url: `/likes/${message.id}/like/${user.id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Likes"],
    }),
  }),
});

export const {
  useGetLikesQuery,
  useCreateLikeMutation,
  useDeleteLikeMutation,
} = likesApi;
