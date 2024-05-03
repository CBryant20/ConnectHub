import { useLocation } from "react-router-dom";

export default function MessageSelected() {
  const location = useLocation();
  const { message } = location.state || {};

  if (!message) {
    return <p>No message selected.</p>;
  }

  return (
    <div>
      <p>Message Date: {new Date(message.createdAt).toLocaleString()}</p>
      <h3>Message Content:</h3>
      <p>{message.content}</p>
    </div>
  );
}
