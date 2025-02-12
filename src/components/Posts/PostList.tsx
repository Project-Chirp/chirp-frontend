import { Divider, Stack } from "@mui/material";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { setPosts } from "../../state/slices/postsSlice";
import useAxios from "../../utilities/useAxios";
import PostItem from "./PostItem";
import RepostItem from "./RepostItem";

const PostList = () => {
  const { posts } = useAppSelector((state) => state.posts);
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const { sendRequest } = useAxios();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const resultPosts = await sendRequest(
          {
            method: "GET",
            params: { userId: user.userId },
          },
          "posts",
        );
        dispatch(setPosts(resultPosts));
      } catch (e) {
        console.log(e.message);
      }
    };
    fetchPosts();
  }, [dispatch, sendRequest, user.userId]);

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
    </Stack>
  );
};

export default PostList;
