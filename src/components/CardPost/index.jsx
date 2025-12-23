import { Author } from "../Author";
import styles from "./cardpost.module.css";
import { ModalComment } from "../ModalComment";
import { ThumbsUpButton } from "./ThumbsUpButton";
import { Link } from "react-router";
import { useState } from "react";

export const CardPost = ({ post }) => {
  const [likes, setLikes] = useState(post.likes);
  const [clickCount, setClickCount] = useState(0);

  const token = localStorage.getItem("access_token");

  function onThumbsIsClicked() {
    if (clickCount < 1) {
      fetch(`http://localhost:3000/blog-posts/${post.id}/like`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      }).then((res) => {
        if (res.ok) {
          setClickCount((prev) => prev + 1);
          setLikes((prev) => prev + 1);
        }
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
            <ModalComment />
            <p>{post.comments.length}</p>
          </div>
        </div>
        <Author author={post.author} />
      </footer>
    </article>
  );
};
