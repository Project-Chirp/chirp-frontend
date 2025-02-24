import { Divider, Stack } from "@mui/material";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { setPosts } from "../../state/slices/postsSlice";
import useAxios from "../../utilities/useAxios";
import PostItem from "../Posts/PostItem";
import RepostItem from "../Posts/RepostItem";

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
      dispatch(setPosts(result));
    };
    fetchPosts();
  }, [dispatch, visitedUserId]);

  return (
    <Stack divider={<Divider />}>
      {posts
        .filter((o) => !o.parentPostId || o.originalPostContent)
        .map((o) =>
          o.originalPostContent && !o.textContent ? (
            <RepostItem key={o.postId} post={o} />
          ) : (
            <PostItem key={o.postId} post={o} />
          ),
        )}
      <Divider />
    </Stack>
  );
};

export default ProfilePosts;
