import { useEffect, useState } from "react";
import PostItem from "./PostItem";
import axios from "axios";

export type Post = {
  displayName: string;
  imagePath?: string;
  textContent: string;
  timestamp: string;
  username: string;
};

const Timeline = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const result = await axios.get("http://localhost:3001/api/posts");
      const data = result.data.map((o: any) => {
        return {
          displayName: o.display_name,
          imagePath: undefined,
          textContent: o.text_content,
          timestamp: o.post_timestamp,
          username: o.email,
        } as Post;
      });
      setPosts(data);
    };
    fetchPosts();
  }, []);

  console.log(posts);

  return (
    <>
      {posts.map((o) => (
        <PostItem post={o} />
      ))}
    </>
  );
};

export default Timeline;
