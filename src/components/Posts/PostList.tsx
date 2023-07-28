import { useEffect } from "react";
import PostItem from "./PostItem";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { Post, setPosts } from "../../state/slices/postsSlice";
import { Divider, Stack } from "@mui/material";
import useAxios from "../../utilities/useAxios";

const PostList = () => {
  const posts = useAppSelector((state) => state.posts);
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const { sendRequest } = useAxios();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const result = await sendRequest({
          url: "/posts",
          method: "get",
          params: { userId: user.userId },
        });
        dispatch(setPosts(result as Post[]));
      } catch (e) {
        console.log(e.message);
      }
    };

    fetchPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, user.userId]);

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
