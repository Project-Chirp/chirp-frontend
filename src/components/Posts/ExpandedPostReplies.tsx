import { Divider } from "@mui/material";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { selectReplies, setPosts } from "../../state/slices/postsSlice";
import { selectCurrentUserId } from "../../state/slices/userSlice";
import useAxios from "../../utilities/useAxios";
import PostItem from "./PostItem";

type ExpandedPostRepliesProps = {
  postId: number;
};

const ExpandedPostReplies = ({ postId }: ExpandedPostRepliesProps) => {
  const posts = useAppSelector((state) => selectReplies(state, postId));
  const currentUserId = useAppSelector(selectCurrentUserId);
  const dispatch = useAppDispatch();
  const { sendRequest } = useAxios();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const resultReplies = await sendRequest(
          {
            method: "GET",
            params: { userId: currentUserId, postId },
          },
          "posts/fetchReplies",
        );
        dispatch(setPosts(resultReplies));
      } catch (e) {
        console.log(e.message);
      }
    };
    fetchPosts();
  }, [dispatch, currentUserId, postId]);

  return (
    <>
      {posts.map((o) => (
        <PostItem key={o.postId} post={o} />
      ))}
      <Divider />
    </>
  );
};

export default ExpandedPostReplies;
