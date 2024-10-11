import { useEffect } from "react";
import PostItem from "./PostItem";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { Post, setPosts } from "../../state/slices/postsSlice";
import { Divider, Stack } from "@mui/material";
import useAxios from "../../utilities/useAxios";

const PostList = () => {
  const { posts } = useAppSelector((state) => state.posts);
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const { loading, error, sendRequest } = useAxios(); // TODO: use loading/error

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const resultPosts = await sendRequest({
          endpoint: "posts",
          method: "GET",
          body: { userId: user.userId },
        });
        dispatch(setPosts(resultPosts as Post[]));
      } catch (e) {
        console.log(e.message);
      }
    };
    fetchPosts();
  }, [dispatch, sendRequest, user.userId]);

  return (
    <Stack divider={<Divider />}>
      {posts
        .filter((o) => o.parentPostId == null)
        .map((o) => (
          <PostItem key={o.postId} post={o} />
        ))}
    </Stack>
  );
};

export default PostList;
