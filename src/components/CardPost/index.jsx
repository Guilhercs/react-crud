import { Author } from "../Author";
import styles from "./cardpost.module.css";
import { ModalComment } from "../ModalComment";
import { ThumbsUpButton } from "./ThumbsUpButton";
import { Link } from "react-router";
import { useState } from "react";
import { http } from "../../api";

export const CardPost = ({ post }) => {
  const [likes, setLikes] = useState(post.likes);
  const [clickCount, setClickCount] = useState(0);
  const [comment, setComments] = useState(post.comments);

  const token = localStorage.getItem("access_token");

  function handleNewComment(comments) {
    setComments((prev) => [...prev, comments]);
  }

  function onThumbsIsClicked() {
    if (clickCount < 1) {
      http.post(`/blog-posts/${post.id}/like`).then(() => {
        setClickCount((prev) => prev + 1);
        setLikes((prev) => prev + 1);
      });
    }
  }

  return (
    <article className={styles.card}>
      <header className={styles.header}>
        <figure className={styles.figure}>
          <img src={post.cover} alt={`Capa do post de titulo: ${post.title}`} />
        </figure>
      </header>
      <section className={styles.body}>
        <h2>{post.title}</h2>
        <p>{post.body}</p>
        <Link to={`/blog-post/${post.slug}`}>Ver detalhes</Link>
      </section>
      <footer className={styles.footer}>
        <div className={styles.actions}>
          <div className={styles.action}>
            <ThumbsUpButton loading={false} onClick={onThumbsIsClicked} />
            <p>{likes}</p>
          </div>
          <div className={styles.action}>
            <ModalComment onSuccess={handleNewComment} postId={post.id} />
            <p>{comment.length}</p>
          </div>
        </div>
        <Author author={post.author} />
      </footer>
    </article>
  );
};
