import api from "../../store/api";

const messagesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getMessages: builder.query({
      query: () => "/messages",
      providesTags: ["Messages"],
    }),
    getMessage: builder.query({
      query: (id) => `/messages/${id}`,
      providesTags: ["Messages"],
    }),
    createMessage: builder.mutation({
      query: (message) => ({
        url: "/messages",
        method: "POST",
        body: message,
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
  useCreateMessageMutation,
  useEditMessageMutation,
  useDeleteMessageMutation,
} = messagesApi;
