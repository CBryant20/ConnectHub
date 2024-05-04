import api from "../../store/api";

const messagesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // Get All Messages
    getMessages: builder.query({
      query: () => "/messages",
      providesTags: ["Messages"],
    }),
    // Get All Messages for the Logged-In User
    getMyMessages: builder.query({
      query: () => "/messages/me",
      providesTags: ["Messages"],
    }),
    // Get a Specific Message by ID (with sender information)
    getMessageById: builder.query({
      query: (id) => `/messages/${id}`,
      providesTags: ["Messages"],
    }),
    // Get Conversation Between Two Users
    getConversationMessages: builder.query({
      query: (userId) => `/messages/conversation/${userId}`,
      providesTags: ["Messages"],
    }),
    // Get Message Thread
    getMessageThread: builder.query({
      query: (messageId) => `/messages/thread/${messageId}`,
      providesTags: ["Messages"],
    }),
    // Create a New Message
    createMessage: builder.mutation({
      query: (content) => ({
        url: "/messages",
        method: "POST",
        body: content,
      }),
      invalidatesTags: ["Messages"],
    }),
    // Create a Reply to a Specific Message
    createReply: builder.mutation({
      query: (reply) => ({
        url: `/messages/reply/${reply.messageId}`,
        method: "POST",
        body: { content: reply.content },
      }),
      invalidatesTags: ["Messages"],
    }),
    // Edit a Sent Message by the Logged-In User
    editMessage: builder.mutation({
      query: (message) => ({
        url: `/messages/sent/${message.id}`,
        method: "PATCH",
        body: { content: message.content },
      }),
      invalidatesTags: ["Messages"],
    }),
    // Delete a Sent Message by the Logged-In User
    deleteMessage: builder.mutation({
      query: (id) => ({
        url: `/messages/sent/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Messages"],
    }),
  }),
});

export const {
  useGetMessagesQuery,
  useGetMyMessagesQuery,
  useGetConversationMessagesQuery,
  useGetMessageThreadQuery,
  useGetMessageByIdQuery,
  useCreateMessageMutation,
  useCreateReplyMutation,
  useEditMessageMutation,
  useDeleteMessageMutation,
} = messagesApi;
