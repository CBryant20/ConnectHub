import { useState } from "react";
import { useCreateMessageMutation } from "./messageSlice";

export default function NewMessage() {
  const [content, setContent] = useState("");
  const [createMessage] = useCreateMessageMutation();

  const addMessage = async (evt) => {
    evt.preventDefault();
    await createMessage({ content });
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
      <button>Send Message</button>
    </form>
  );
}
