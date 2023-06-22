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
      try {
        const resultPosts = await axios.get("http://localhost:3001/api/posts", {
          params: {
            userId: user.userId,
          },
        });
        dispatch(setPosts(resultPosts.data as Post[]));
      } catch (e) {
        console.log(e.message);
      }
    };
    fetchPosts();
  }, [dispatch, user]);

  return (
    <>
      {posts
        .filter((o) => !o.isReply)
        .map((o, index) => (
          <PostItem key={index} post={o} />
        ))}
    </>
  );
};

export default PostList;
