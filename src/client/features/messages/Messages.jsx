import { useSelector } from "react-redux";
import { selectToken } from "../auth/authSlice";

import NewMessage from "./NewMessage";
import Message from "./Message";
import { useGetMessageQuery } from "./messageSlice";

import "./Messages.scss";

export default function Messages({}) {
  const token = useSelector(selectToken);
  const userId = useSelector((state) => state.auth.userId);
  const { data: messages, isLoading } = useGetMessageQuery();

  if (!token) {
    return <p>You must be logged in to see your messages.</p>;
  }

  const hasMessages = messages && messages.length > 0;

  return (
    <div className='tasks'>
      <h1>Messages</h1>
      <h2>Send A Message</h2>
      <NewMessage userId={userId} />
      {hasMessages && (
        <>
          <h2>Your Messages</h2>
          {isLoading && <p>Loading messages...</p>}
          <ul>
            {messages.map((message) => (
              <Message key={message.id} message={message} />
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
