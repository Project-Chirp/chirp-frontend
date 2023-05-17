import { useEffect } from "react";
import PostItem from "./PostItem";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { Post, setPosts } from "../../state/slices/postsSlice";

const PostList = () => {
  const posts = useAppSelector((state) => state.posts);
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchPosts = async () => {
      const result = await axios.get("http://localhost:3001/api/posts", {
        params: {
          userId: user.userId,
        },
      });
      dispatch(setPosts(result.data as Post[]));
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
