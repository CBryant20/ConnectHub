import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  useDeleteMessageMutation,
  useGetMessageSelectedQuery,
} from "./messageSlice";

export default function Message({ message }) {
  const navigate = useNavigate();
  const [isChatOpened, setIsChatOpened] = useState(false);
  const [deleteMessage] = useDeleteMessageMutation();
  const { data: selectedMessage } = useGetMessageSelectedQuery(
    isChatOpened ? message.id : null
  );

  console.log("Message ID:", message.id);
  console.log("Message User ID:", message.userId);

  const handleDelete = async () => {
    try {
      await deleteMessage(message.id);
      console.log("Message deleted");
    } catch (error) {
      console.error("Error deleting message:", error);
    }
  };

  const openChatWindow = async () => {
    if (!isChatOpened) {
      setIsChatOpened(true);
      navigate(`/messages/${message.id}`);
    }
  };

  return (
    <li>
      <div>
        <p>Message Date: {new Date(message.createdAt).toLocaleString()}</p>
        <button onClick={openChatWindow} aria-label='open-chat'>
          Open Chat
        </button>
        <button onClick={handleDelete}>Delete Message</button>
        {isChatOpened && <MessageSelected message={selectedMessage} />}
      </div>
    </li>
  );
}
