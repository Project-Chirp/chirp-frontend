import { Divider, Stack } from "@mui/material";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { selectPosts, setPosts } from "../../state/slices/postsSlice";
import useAxios from "../../utilities/useAxios";
import PostItem from "../Posts/PostItem";

type ProfileRepliesProps = {
  visitedUserId: number;
};

const ProfileReplies = ({ visitedUserId }: ProfileRepliesProps) => {
  const posts = useAppSelector(selectPosts);
  const dispatch = useAppDispatch();
  const { sendRequest } = useAxios();

  useEffect(() => {
    const fetchPosts = async () => {
      const result = await sendRequest(
        {
          method: "GET",
          params: { visitedUserId },
        },
        "profile/getUserReplies",
      );
      dispatch(setPosts(result));
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

export default ProfileReplies;
