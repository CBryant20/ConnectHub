import { useLocation } from "react-router-dom";
import {
  useCreateReplyMutation,
  useGetMessageThreadQuery,
  useDeleteMessageMutation,
} from "./messageSlice";
import { useState } from "react";

import "./MessageSelected.scss";

export default function MessageSelected() {
  const { state } = useLocation();
  const { messageId } = state || {};

  const [replyContent, setReplyContent] = useState("");
  const [createReply] = useCreateReplyMutation();
  const [deleteMessage] = useDeleteMessageMutation();

  const {
    data: thread,
    isLoading,
    error,
  } = useGetMessageThreadQuery(messageId);

  if (isLoading) {
    return <p>Loading message thread...</p>;
  }

  if (error) {
    return <p>Failed to load message thread. Please try again later.</p>;
  }

  const handleReply = async (e) => {
    e.preventDefault();
    if (messageId && replyContent.trim() !== "") {
      await createReply({ messageId, content: replyContent });
      setReplyContent("");
    }
  };

  const handleDelete = async (messageId) => {
    await deleteMessage(messageId);
  };

  return (
    <div className='message-thread'>
      {thread && thread.length > 0 ? (
        <>
          {thread.map((message) => (
            <div
              key={message.id}
              className={`message ${
                message.senderId === 21 ? "received" : "sent"
              }`}
            >
              <div
                className={`message-content ${
                  message.senderId === 21 ? "align-left" : "align-right"
                }`}
              >
                <strong>{message.sender.fullName}</strong>
                <p>{message.content}</p>
                <small>
                  {new Date(message.createdAt).toLocaleString(undefined, {
                    timeStyle: "short",
                    dateStyle: "short",
                  })}
                </small>

                {message.senderId !== 21 && (
                  <button onClick={() => handleDelete(message.id)}>
                    Delete
                  </button>
                )}
              </div>
            </div>
          ))}

          <form onSubmit={handleReply} className='reply-form'>
            <input
              type='text'
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              placeholder='Type your reply here'
              required
            />
            <button type='submit'>Reply</button>
          </form>
        </>
      ) : (
        <p>No messages found.</p>
      )}
    </div>
  );
}
