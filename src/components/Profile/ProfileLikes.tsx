import { useEffect } from "react";
import PostItem from "../Posts/PostItem";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { Post, setPosts } from "../../state/slices/postsSlice";
import useAxios from "../../utilities/useAxios";
import { Divider, Stack } from "@mui/material";

type ProfileLikesProps = {
  userId: number;
};

const ProfileLikes = ({ userId }: ProfileLikesProps) => {
  const { posts } = useAppSelector((state) => state.posts);
  const dispatch = useAppDispatch();
  const { loading, error, sendRequest } = useAxios();

  useEffect(() => {
    const fetchPosts = async () => {
      const result = await sendRequest({
        endpoint: "profile/getUserLikes",
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

export default ProfileLikes;
