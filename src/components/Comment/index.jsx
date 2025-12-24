import styles from "./comment.module.css";
import { Avatar } from "../Avatar";
import { ModalComment } from "../ModalComment";
import { useAuth } from "../../hooks/useAuth";
import { useState } from "react";

export const Comment = ({ comment }) => {
  const [text, setText] = useState(comment.text);

  const { user } = useAuth();

  const isOwner = user && user.id == comment.author.id;

  const handleEdit = (newComment) => {
    setText(newComment.text);
  };

  return (
    <div className={styles.comment}>
      <Avatar author={comment.author} />
      <strong>@{comment.author.name}</strong>
      <p>{text}</p>
      <div className={styles.divider} />
      {isOwner && (
        <ModalComment
          commentId={comment.id}
          comment={comment.text}
          isEditing
          onSuccess={handleEdit}
        />
      )}
    </div>
  );
};
