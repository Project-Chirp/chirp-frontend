import { useEffect } from "react";
import PostItem from "../Posts/PostItem";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { Post, setPosts } from "../../state/slices/postsSlice";
import useAxios from "../../utilities/useAxios";
import { Divider, Stack } from "@mui/material";
import axios from "axios";

type ProfilePostsProps = {
  userId: number;
};

const ProfilePosts = ({ userId }: ProfilePostsProps) => {
  const { posts } = useAppSelector((state) => state.posts);
  const dispatch = useAppDispatch();
  const { loading, error, sendRequest } = useAxios();

  useEffect(() => {
    const fetchPosts = async () => {
      const result = await sendRequest({
        endpoint: "profile/getUserPosts",
        method: "GET",
        params: { visitedUserId: userId },
      });
      dispatch(setPosts(result as Post[]));
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
