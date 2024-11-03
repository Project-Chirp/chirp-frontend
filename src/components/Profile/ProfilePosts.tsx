import { Divider, Stack } from "@mui/material";
import axios from "axios";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { Post, setPosts } from "../../state/slices/postsSlice";
import PostItem from "../Posts/PostItem";

type ProfilePostsProps = {
  userId: number;
};

const ProfilePosts = ({ userId }: ProfilePostsProps) => {
  const { posts } = useAppSelector((state) => state.posts);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchPosts = async () => {
      const result = await axios.get(
        "http://localhost:3001/api/profile/getUserPosts",
        {
          params: {
            visitedUserId: userId,
          },
        },
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

export default ProfilePosts;
