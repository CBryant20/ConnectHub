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
    <form onSubmit={addMessage} className='send-form'>
      <input
        type='text'
        placeholder='Tell me whats on your mind!'
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />
      <button>Send Message</button>
    </form>
  );
}
