import { useEffect } from "react";
import PostItem from "../Posts/PostItem";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { Post, setPosts } from "../../state/slices/postsSlice";
import useAxios from "../../utilities/useAxios";
import { Divider, Stack } from "@mui/material";

type ProfilePostsProps = {
  visitedUserId: number;
};

const ProfilePosts = ({ visitedUserId }: ProfilePostsProps) => {
  const { posts } = useAppSelector((state) => state.posts);
  const currentUserId = useAppSelector((state) => state.user.userId);
  const dispatch = useAppDispatch();
  const { loading, error, sendRequest } = useAxios(); // TODO: use loading/error

  useEffect(() => {
    const fetchPosts = async () => {
      const result = await sendRequest({
        endpoint: "profile/getUserPosts",
        method: "GET",
        params: { currentUserId, visitedUserId },
      });
      dispatch(setPosts(result as Post[]));
    };
    fetchPosts();
  }, [dispatch, currentUserId, visitedUserId]);

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
