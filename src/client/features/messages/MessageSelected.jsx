import { useGetMessageSelectedQuery } from "./messageSlice";

export default function MessageSelected({ messageId }) {
  const {
    data: selectedMessage,
    isLoading,
    isError,
  } = useGetMessageSelectedQuery(messageId);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error fetching message</p>;
  }

  if (!selectedMessage) {
    return null;
  }

  return (
    <div>
      <p>
        Message Date: {new Date(selectedMessage.createdAt).toLocaleString()}
      </p>
      <p>Message Content: {selectedMessage.content}</p>
    </div>
  );
}
