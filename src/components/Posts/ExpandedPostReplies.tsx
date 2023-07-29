import { useEffect } from "react";
import PostItem from "./PostItem";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { Post, setPosts } from "../../state/slices/postsSlice";
import useAxios from "../../utilities/useAxios";

type ExpandedPostRepliesProps = {
  post: Post;
};

const ExpandedPostReplies = ({ post }: ExpandedPostRepliesProps) => {
  const posts = useAppSelector((state) => state.posts);
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const { sendRequest } = useAxios();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const resultReplies = await sendRequest({
          url: "/posts/fetchReplies",
          method: "get",
          params: { userId: user.userId, postId: post.postId },
        });
        dispatch(setPosts(resultReplies as Post[]));
      } catch (e) {
        console.log(e.message);
      }
    };
    fetchPosts();
  }, [dispatch, user, post, sendRequest]);

  return (
    <>
      {posts
        .filter((o) => o.parentPostId === post.postId)
        .map((o) => (
          <PostItem key={o.postId} post={o} />
        ))}
    </>
  );
};

export default ExpandedPostReplies;
