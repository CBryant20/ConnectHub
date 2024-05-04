import { useSelector } from "react-redux";
import { selectToken } from "../auth/authSlice";

import NewMessage from "./NewMessage";
import Message from "./Message";
import { useGetMostRecentMessageQuery } from "./messageSlice";

import "./Messages.scss";

export default function Messages() {
  const token = useSelector(selectToken);
  const userId = useSelector((state) => state.auth.userId);

  if (!token) {
    return <p>You must be logged in to see your messages.</p>;
  }

  const {
    data: messages,
    isLoading,
    error,
  } = useGetMostRecentMessageQuery(userId);

  if (isLoading) {
    return <p>Loading messages...</p>;
  }

  if (error) {
    return <p>Failed to load messages. Please try again later.</p>;
  }

  const hasMessages = messages && messages.length > 0;

  return (
    <div className='tasks'>
      <h1>Messages</h1>
      <h2>Create A New Message</h2>
      <NewMessage userId={userId} />
      {hasMessages ? (
        <>
          <h2>Your Messages</h2>
          <ul>
            {messages.map((message) => (
              <Message key={message.id} message={message} />
            ))}
          </ul>
        </>
      ) : (
        <p>You have no messages.</p>
      )}
    </div>
  );
}
