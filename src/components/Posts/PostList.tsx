import { useEffect, useState } from "react";
import PostItem from "./PostItem";
import axios from "axios";

export type Post = {
  displayName: string;
  imagePath?: string;
  textContent: string;
  postTimestamp: string;
  userName: string;
};

const Timeline = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const result = await axios.get("http://localhost:3001/api/posts");
      setPosts(result.data as Post[]);
    };
    fetchPosts();
  }, []);

  return (
    <>
      {posts.map((o, index) => (
        <PostItem post={o} key={index} />
      ))}
    </>
  );
};

export default Timeline;
