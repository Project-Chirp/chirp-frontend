import { useEffect } from "react";
import PostItem from "../Posts/PostItem";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { Post, setPosts } from "../../state/slices/postsSlice";
import useAxios from "../../utilities/useAxios";

const ProfileTweets = () => {
  const posts = useAppSelector((state) => state.posts);
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const { sendRequest } = useAxios();

  useEffect(() => {
    const fetchPosts = async () => {
      const result = await sendRequest({
        url: "/profile/getOwnTweets",
        method: "get",
        params: { userId: user.userId },
      });
      dispatch(setPosts(result as Post[]));
    };
    fetchPosts();
  }, [dispatch, user, sendRequest]);

  return (
    <>
      {posts.map((o, index) => (
        <PostItem key={index} post={o} />
      ))}
    </>
  );
};

export default ProfileTweets;
