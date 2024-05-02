import { useState } from "react";
import { useDeleteMessageMutation } from "./messageSlice";

/** Allows user to read, update, and delete a messages */
export default function Message({ message }) {
  const [deleteMessage] = useDeleteMessageMutation();

  const onDelete = async (evt) => {
    evt.preventDefault();
    deleteMessage(message.id);
  };

  return (
    <li>
      <div>
        <p>Date Created: {new Date(message.createdAt).toLocaleString()}</p>
      </div>
      <button onClick={onDelete} aria-label='delete'>
        🞪 Delete
      </button>
    </li>
  );
}
