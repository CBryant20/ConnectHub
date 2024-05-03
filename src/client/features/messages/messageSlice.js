import api from "../../store/api";

const messagesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // Get All messages
    getMessages: builder.query({
      query: () => "/messages",
      providesTags: ["Messages"],
    }),
    // Gets all messages for the logged in user
    getMyMessages: builder.query({
      query: (id) => `/messages/${id}`,
      providesTags: ["Messages"],
    }),
    // Gets all messages for the logged in user
    getConversationMessages: builder.query({
      query: (userId) => `/messages/conversation/${userId}/21`,
      providesTags: ["Messages"],
    }),
    // Get all sent messages
    getSentMessages: builder.query({
      query: () => "/messages/sent",
      providesTags: ["Messages"],
    }),
    // Get sent message by ID
    getSentMessageById: builder.query({
      query: (id) => `/messages/sent/${id}`,
      providesTags: ["Messages"],
    }),
    // Get all received messages
    getReceivedMessages: builder.query({
      query: () => "/messages/received",
      providesTags: ["Messages"],
    }),
    // Get received message by ID
    getReceivedMessageById: builder.query({
      query: (id) => `/messages/received/${id}`,
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
        url: `/messages/sent/${message.id}`,
        method: "PATCH",
        body: message,
      }),
      invalidatesTags: ["Messages"],
    }),
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
  useGetSentMessagesQuery,
  useGetSentMessageByIdQuery,
  useGetReceivedMessagesQuery,
  useGetReceivedMessageByIdQuery,
  useCreateMessageMutation,
  useEditMessageMutation,
  useDeleteMessageMutation,
} = messagesApi;
