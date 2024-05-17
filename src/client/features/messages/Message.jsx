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
    await deleteMessage(messageId);
  };

  return (
    <>
      <div>
        <h3>
          Chat started by: {message.sender.firstName} {message.sender.lastName}
        </h3>
        <p>
          {new Date(message.createdAt).toLocaleString(undefined, {
            timeStyle: "short",
            dateStyle: "short",
          })}
        </p>
        <button onClick={openChatWindow} aria-label='open-chat'>
          Open Chat
        </button>
        {message.senderId === 41 && (
          <button onClick={() => handleDelete(message.id)}>Delete</button>
        )}
      </div>
      {isChatOpened && <MessageSelected />}
    </>
  );
}
