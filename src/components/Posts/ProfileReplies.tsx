import { useEffect } from "react";
import PostItem from "./PostItem";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { Post, setPosts } from "../../state/slices/postSlice";

const ProfileReplies = () => {
  const posts = useAppSelector((state) => state.post);
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchPosts = async () => {
      const result = await axios.get(
        "http://localhost:3001/api/posts/getOwnReplies",
        {
          params: {
            userId: user.userId,
          },
        }
      );
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

export default ProfileReplies;
