import { useState } from "react";
import { useCreateMessageMutation } from "./messageSlice";

export default function NewMessage({ userId }) {
  const [content, setContent] = useState("");
  const [createMessage] = useCreateMessageMutation();

  const addMessage = async (evt) => {
    evt.preventDefault();
    createMessage({ userId, content });
    setContent("");
  };

  return (
    <form onSubmit={addMessage}>
      <input
        type='text'
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />
      <button>Send</button>
    </form>
  );
}
