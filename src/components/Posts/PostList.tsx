import { useEffect } from "react";
import PostItem from "./PostItem";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { Post, setPosts } from "../../state/slices/postsSlice";

const PostList = () => {
  const posts = useAppSelector((state) => state.posts);
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const formatTimestamp = (entry: any) => {
    const date = new Date(entry.timestamp);
    const currentDate = new Date();
    const millisecondsInADay = 24 * 60 * 60 * 1000;
    const timeDifference = currentDate.getTime() - date.getTime();
    if (timeDifference < millisecondsInADay) {
      const hourDiff = timeDifference / (60 * 60 * 1000);
      if (hourDiff < 1) {
        return `${Math.floor(timeDifference / (60 * 1000))}m`;
      } else {
        return `${Math.floor(hourDiff)}h`;
      }
    } else {
      const modifiedDateString = date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
      return modifiedDateString;
    }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const resultPosts = await axios.get("http://localhost:3001/api/posts", {
          params: {
            userId: user.userId,
          },
        });
        const modified = resultPosts.data.map((entry: any) => ({
          ...entry,
          timestamp: formatTimestamp(entry),
        }));
        dispatch(setPosts(modified as Post[]));
      } catch (e) {
        console.log(e.message);
      }
    };
    fetchPosts();
  }, [dispatch, user]);

  return (
    <>
      {posts.map((o, index) => (
        <PostItem key={index} post={o} />
      ))}
    </>
  );
};

export default PostList;
