import { useCreateLikeMutation, useDeleteLikeMutation } from "./like";
import { useSelector } from "react-redux";

export default function Like({ message }) {
  const userId = useSelector((state) => state.auth.userId);
  const [createLike] = useCreateLikeMutation();
  const [deleteLike] = useDeleteLikeMutation();

  if (!message) {
    return <p>Message not found.</p>;
  }

  const isLikedByCurrentUser = message.likes?.some(
    (like) => like.userId === userId
  );

  const handleLike = async () => {
    if (isLikedByCurrentUser) {
      await deleteLike({ messageId: message.id, userId });
    } else {
      await createLike({ messageId: message.id });
    }
  };

  return (
    <button onClick={handleLike}>
      {isLikedByCurrentUser ? "Unlike" : "Like"}
    </button>
  );
}
