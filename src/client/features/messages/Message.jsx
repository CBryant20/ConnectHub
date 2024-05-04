import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDeleteMessageMutation } from "./messageSlice";
import MessageThread from "./MessageSelected";

export default function Message({ message }) {
  const navigate = useNavigate();
  const [isChatOpened, setIsChatOpened] = useState(false);
  const [deleteMessage] = useDeleteMessageMutation();

  const handleDelete = async (evt) => {
    evt.preventDefault();
    deleteMessage(message.id);
  };

  const openChatWindow = async () => {
    if (!isChatOpened) {
      setIsChatOpened(true);
      if (message?.id) {
        navigate(`/messages/${message.id}`, {
          state: { messageId: message.id },
        });
      } else {
        console.error("Message ID is undefined.");
      }
    }
  };

  return (
    <li>
      <div>
        <h3>Message sent by: #{message.senderId}</h3>
        <p>Last Message Date: {new Date(message.createdAt).toLocaleString()}</p>
        <button onClick={openChatWindow} aria-label='open-chat'>
          Open Chat
        </button>
        <button onClick={handleDelete}>Delete Message</button>
        {isChatOpened && <MessageThread message={message.id} />}
      </div>
    </li>
  );
}
