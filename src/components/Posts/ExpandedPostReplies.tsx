import { useEffect } from "react";
import PostItem from "./PostItem";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { Post, setPosts } from "../../state/slices/postsSlice";
import { Divider } from "@mui/material";

type ExpandedPostRepliesProps = {
  postId: number;
};

const ExpandedPostReplies = ({ postId }: ExpandedPostRepliesProps) => {
  const { posts } = useAppSelector((state) => state.posts);
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const resultReplies = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/posts/fetchReplies`,
          {
            params: {
              userId: user.userId,
              postId: postId,
            },
          }
        );
        dispatch(setPosts(resultReplies.data as Post[]));
      } catch (e) {
        console.log(e.message);
      }
    };
    fetchPosts();
  }, [dispatch, user, postId]);

  return (
    <>
      {posts
        .filter((o) => o.parentPostId === postId)
        .map((o) => (
          <PostItem key={o.postId} post={o} />
        ))}
      <Divider />
    </>
  );
};

export default ExpandedPostReplies;
