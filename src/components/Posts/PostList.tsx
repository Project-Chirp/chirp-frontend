import { useEffect } from "react";
import PostItem from "./PostItem";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { Post, setPosts } from "../../state/slices/postsSlice";

const PostList = () => {
  const posts = useAppSelector((state) => state.posts);
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const formatTimestamp = (entry: any) => {
    const date = new Date(entry.timestamp);
    const currentDate = new Date();
    if (currentDate.toDateString() !== date.toDateString()) {
      const modifiedDateString = date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
      return modifiedDateString;
    } else {
      return "test";
    }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const resultPosts = await axios.get("http://localhost:3001/api/posts", {
          params: {
            userId: user.userId,
          },
        });
        const modified = resultPosts.data.map((entry: any) => ({
          ...entry,
          timestamp: formatTimestamp(entry),
        }));
        console.log(modified);
        dispatch(setPosts(modified as Post[]));
      } catch (e) {
        console.log(e.message);
      }
    };
    fetchPosts();
  }, [dispatch, user]);

  return (
    <>
      {posts.map((o, index) => (
        <PostItem key={index} post={o} />
      ))}
    </>
  );
};

export default PostList;
