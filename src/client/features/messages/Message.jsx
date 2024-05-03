import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDeleteMessageMutation } from "./messageSlice";

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
          state: { message },
        });
      } else {
        console.error("Message ID is undefined.");
      }
    }
  };

  return (
    <li>
      <div>
        <p>Last Message Date: {new Date(message.createdAt).toLocaleString()}</p>
        <button onClick={openChatWindow} aria-label='open-chat'>
          Open Chat
        </button>
        <button onClick={handleDelete}>Delete Message</button>
        {isChatOpened && <MessageSelected message={message.id} />}
      </div>
    </li>
  );
}
