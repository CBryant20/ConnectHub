import { useSelector } from "react-redux";

import NewMessage from "./NewMessage";
import Message from "./Message";
import { useGetOriginalMessagesQuery } from "./messageSlice";

import "./Messages.scss";

export default function Messages() {
  const userId = useSelector((state) => state.auth.userId);

  const { data: messages, isLoading, error } = useGetOriginalMessagesQuery();

  if (isLoading) {
    return <p>Loading messages...</p>;
  }

  if (error) {
    return <p>Failed to load messages. Please try again later.</p>;
  }

  const hasMessages = messages && messages.length > 0;

  return (
    <div className='messages'>
      <div className='message-section'>
        <h1>Messages</h1>
        {hasMessages ? (
          <ul>
            {messages.map((message) => (
              <li className='message-chat' key={message.id}>
                <Message message={message} />
              </li>
            ))}
          </ul>
        ) : (
          <p>You have no messages.</p>
        )}
      </div>

      <div className='new-message'>
        <h2>Create A New Message</h2>
        <NewMessage userId={userId} />
      </div>
    </div>
  );
}
