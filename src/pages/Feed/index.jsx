import { CardPost } from "../../components/CardPost";
import styles from "./feed.module.css";
import { useEffect, useState } from "react";

export const Feed = () => {
  const BFF_URL = "http://localhost:3000";

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch(`${BFF_URL}/blog-posts`)
      .then((response) => {
        return response.json();
      })
      .then((data) => setPosts(data));
  }, []);

  return (
    <main className={styles.grid}>
      {posts.map((post) => (
        <CardPost key={post.slug} post={post} />
      ))}
    </main>
  );
};
