import { useState } from "react";
import {
  useDeleteMessageMutation,
  useEditMessageMutation,
} from "./messageSlice";

/** Allows user to read, update, and delete a messages */
export default function Message({ message }) {
  const [editMessage] = useEditMessageMutation();
  const [deleteMessage] = useDeleteMessageMutation();

  const [content, setContent] = useState(message.content);

  /** Updates the message's `done` status */
  const toggleMessage = async (evt) => {
    const done = evt.target.checked;
    editMessage({ ...message, done });
  };

  const save = async (evt) => {
    evt.preventDefault();
    editMessage({ ...message, content });
  };

  const onDelete = async (evt) => {
    evt.preventDefault();
    deleteMessage(message.id);
  };

  return (
    <li>
      <form onSubmit={save}>
        <input
          type='checkbox'
          checked={message.done}
          onChange={toggleMessage}
        />
        <input
          type='text'
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <button>Save</button>
        <button onClick={onDelete} aria-label='delete'>
          🞪
        </button>
      </form>
    </li>
  );
}
