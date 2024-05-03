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
    getMessageSelected: builder.query({
      query: (message) => {
        if (!message || !message.id) {
          throw new Error("Invalid message object");
        }
        return {
          url: `/messages/${message.id}`,
        };
      },
      providesTags: ["Messages"],
    }),
    createMessage: builder.mutation({
      query: (userId, message) => ({
        url: `/messages/${userId}`,
        method: "POST",
        body: { message },
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
