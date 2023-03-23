import { useEffect, useState } from "react";
import PostItem from "./PostItem";
import axios from "axios";

export type Post = {
  displayName: string;
  imagePath?: string;
  isLikedByCurrentUser: boolean;
  numberOfLikes: number;
  postId: number;
  textContent: string;
  timestamp: string;
  username: string;
};

const Timeline = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const result = await axios.get("http://localhost:3001/api/posts", {
        params: {
          userId: 1,
        },
      });
      setPosts(result.data as Post[]);
    };
    fetchPosts();
  }, []);

  return (
    <>
      {console.log(posts)}
      {posts.map((o, index) => (
        <PostItem key={index} post={o} />
      ))}
    </>
  );
};

export default Timeline;
