import { useSelector } from "react-redux";
import { selectToken } from "../auth/authSlice";
import NewMessage from "./NewMessage";
import Message from "./Message";
import { useGetMessageQuery } from "./messageSlice";

import "./Messages.scss";

/** Main interface for user to interact with their messages */
export default function Messages() {
  const token = useSelector(selectToken);
  const { data: messages, isLoading } = useGetMessageQuery();

  if (!token) {
    return <p>You must be logged in to see your messages.</p>;
  }

  return (
    <div className='tasks'>
      <h1>Messages</h1>
      <h2>Send New Message</h2>
      <NewMessage />
      <h2>Your Messages</h2>
      {isLoading && <p>Loading messages...</p>}
      {messages && (
        <ul>
          {messages.map((message) => (
            <Message key={message.id} message={message} />
          ))}
        </ul>
      )}
    </div>
  );
}
