import { Divider, Stack } from "@mui/material";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { selectNonReplyPosts, setPosts } from "../../state/slices/postsSlice";
import { selectCurrentUserId } from "../../state/slices/userSlice";
import useAxios from "../../utilities/useAxios";
import PostItem from "./PostItem";

const PostList = () => {
  const posts = useAppSelector(selectNonReplyPosts);
  const currentUserId = useAppSelector(selectCurrentUserId);
  const dispatch = useAppDispatch();

  const { sendRequest } = useAxios();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const resultPosts = await sendRequest(
          {
            method: "GET",
            params: { userId: currentUserId },
          },
          "posts",
        );
        dispatch(setPosts(resultPosts));
      } catch (e) {
        console.log(e.message);
      }
    };
    fetchPosts();
  }, [dispatch, sendRequest, currentUserId]);

  return (
    <Stack divider={<Divider />}>
      {posts.map((o) => (
        <PostItem key={o.postId} post={o} />
      ))}
    </Stack>
  );
};

export default PostList;
