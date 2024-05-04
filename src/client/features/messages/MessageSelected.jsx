import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  useCreateReplyMutation,
  useGetMessageThreadQuery,
} from "./messageSlice";

export default function MessageSelected() {
  const location = useLocation();
  const { messageId } = location.state || {};
  const [replyContent, setReplyContent] = useState("");
  const [createReply] = useCreateReplyMutation();

  const {
    data: thread,
    isLoading,
    error,
  } = useGetMessageThreadQuery(messageId);

  useEffect(() => {
    if (!messageId) {
      console.error("No message ID provided.");
    }
  }, [messageId]);

  if (!messageId) {
    return <p>No message selected.</p>;
  }

  if (isLoading) {
    return <p>Loading message thread...</p>;
  }

  if (error) {
    return <p>Failed to load message thread. Please try again later.</p>;
  }

  const handleReply = async (e) => {
    e.preventDefault();
    if (messageId) {
      await createReply({ messageId, content: replyContent });
      setReplyContent("");
    }
  };

  return (
    <div>
      {thread && thread.length > 0 && (
        <>
          <p>Message Date: {new Date(thread[0]?.createdAt).toLocaleString()}</p>
          <h3>Message Content:</h3>
          <p>{thread[0]?.content}</p>

          <h3>Replies:</h3>
          <ul>
            {thread.slice(1).map((msg) => (
              <li key={msg.id}>
                <p>Reply Date: {new Date(msg.createdAt).toLocaleString()}</p>
                <p>{msg.content}</p>
              </li>
            ))}
          </ul>
        </>
      )}

      <form onSubmit={handleReply}>
        <input
          type='text'
          value={replyContent}
          onChange={(e) => setReplyContent(e.target.value)}
          placeholder='Type your reply here'
          required
        />
        <button type='submit'>Reply</button>
      </form>
    </div>
  );
}
