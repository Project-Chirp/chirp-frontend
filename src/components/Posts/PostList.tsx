import { useEffect } from "react";
import PostItem from "./PostItem";
import axios from "axios";
import { usePostContext } from "../../context/PostContext";

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

const PostList = () => {
  const { posts, setPosts } = usePostContext();

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
  }, [setPosts]);

  return (
    <>
      {posts.map((o, index) => (
        <PostItem key={index} post={o} />
      ))}
    </>
  );
};

export default PostList;
