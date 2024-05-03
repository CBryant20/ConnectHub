import api from "../../store/api";

const messagesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getMessages: builder.query({
      query: () => "/messages",
      providesTags: ["Messages"],
    }),
    getMessage: builder.query({
      query: (userId) => `/messages/user/${userId}`,
      providesTags: ["Messages"],
    }),
    createMessage: builder.mutation({
      query: (content) => ({
        url: "/messages",
        method: "POST",
        body: content,
      }),
      invalidatesTags: ["Messages"],
    }),
    editMessage: builder.mutation({
      query: (message) => ({
        url: `/messages/${message.id}`,
        method: "PUT",
        body: message,
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
  useGetMessageSelectedQuery,
  useCreateMessageMutation,
  useEditMessageMutation,
  useDeleteMessageMutation,
} = messagesApi;
