import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDeleteMessageMutation } from "./messageSlice";
import MessageSelected from "./MessageSelected";

export default function Message({ message }) {
  const navigate = useNavigate();
  const [isChatOpened, setIsChatOpened] = useState(false);
  const [deleteMessage] = useDeleteMessageMutation();

  const openChatWindow = async () => {
    if (!isChatOpened) {
      setIsChatOpened(true);
      navigate(`/messages/${message.id}`, {
        state: { messageId: message.id },
      });
    }
  };

  const handleDelete = async (messageId) => {
    deleteMessage(messageId);
  };

  return (
    <>
      <div>
        <h3>Message sent by: {message.sender.fullName}</h3>
        <p>Last Message Date: {new Date(message.createdAt).toLocaleString()}</p>
        <button onClick={openChatWindow} aria-label='open-chat'>
          Open Chat
        </button>
        {message.senderId === 21 && (
          <button onClick={() => handleDelete(message.id)}>Delete</button>
        )}
      </div>
      {isChatOpened && <MessageSelected />}
    </>
  );
}
