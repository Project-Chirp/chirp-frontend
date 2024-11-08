import { useEffect } from "react";
import PostItem from "../Posts/PostItem";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { Post, setPosts } from "../../state/slices/postsSlice";
import { Divider, Stack } from "@mui/material";

type ProfileRepliesProps = {
  userId: number;
};

const ProfileReplies = ({ userId }: ProfileRepliesProps) => {
  const { posts } = useAppSelector((state) => state.posts);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchPosts = async () => {
      const result = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/profile/getUserReplies`,
        {
          params: {
            visitedUserId: userId,
          },
        }
      );
      dispatch(setPosts(result.data as Post[]));
    };
    fetchPosts();
  }, [dispatch, userId]);

  return (
    <Stack divider={<Divider />}>
      {posts.map((o, index) => (
        <PostItem key={index} post={o} />
      ))}
      <Divider />
    </Stack>
  );
};

export default ProfileReplies;
