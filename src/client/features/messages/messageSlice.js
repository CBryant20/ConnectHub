import api from "../../store/api";

const messagesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getMessages: builder.query({
      query: () => "/messages",
      providesTags: ["Messages"],
    }),
    getMessage: builder.query({
      query: (userId) => `/messages/${userId}`,
      providesTags: ["Messages"],
    }),
    createMessage: builder.mutation({
      query: (user) => ({
        url: `/messages/${user.id}`,
        method: "POST",
        body: message,
      }),
      invalidatesTags: ["Messages"],
    }),
    editMessage: builder.mutation({
      query: (message) => ({
        url: `/messages/${message.id}`,
        method: "PUT",
        body: content,
      }),
      invalidatesTags: ["Messages"],
    }),
    deleteMessage: builder.mutation({
      query: (id) => ({
        url: `/messages/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Messages"],
    }),
  }),
});

export const {
  useGetMessagesQuery,
  useGetMessageQuery,
  useCreateMessageMutation,
  useEditMessageMutation,
  useDeleteMessageMutation,
} = messagesApi;
