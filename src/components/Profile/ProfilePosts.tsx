import { Divider, Stack } from "@mui/material";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { Post, setPosts } from "../../state/slices/postsSlice";
import useAxios from "../../utilities/useAxios";
import PostItem from "../Posts/PostItem";

type ProfilePostsProps = {
  visitedUserId: number;
};

const ProfilePosts = ({ visitedUserId }: ProfilePostsProps) => {
  const { posts } = useAppSelector((state) => state.posts);
  const dispatch = useAppDispatch();
  const { sendRequest } = useAxios();

  useEffect(() => {
    const fetchPosts = async () => {
      const result = await sendRequest(
        {
          method: "GET",
          params: { visitedUserId },
        },
        "profile/getUserPosts",
      );
      dispatch(setPosts(result as Post[]));
    };
    fetchPosts();
  }, [dispatch, visitedUserId]);

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
