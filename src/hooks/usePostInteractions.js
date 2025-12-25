import { useCallback, useEffect, useState } from "react";
import { http } from "../api";

export const usePostInteractions = (post) => {
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    if (!post) return;

    setLikes(post.likes ?? 0);
    setComments(post.comments ?? []);
  }, [post]);

  const handleNewComment = useCallback((comment) => {
    setComments((prev) => [comment, ...prev]);
  }, []);

  const onThumbsIsClicked = useCallback((id) => {
    http.post(`/blog-posts/${id}/like`).then(() => {
      setLikes((prev) => prev + 1);
    });
  }, []);

  const deleteComment = useCallback((commentId) => {
    http.delete(`/comments/${commentId}`).then(() => {
      setComments((prev) => prev.filter((comment) => comment.id !== commentId));
    });
  }, []);

  return {
    likes,
    comments,
    handleNewComment,
    deleteComment,
    onThumbsIsClicked,
  };
};
