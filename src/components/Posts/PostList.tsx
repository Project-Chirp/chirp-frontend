import { useEffect, useState } from "react";
import PostItem from "./PostItem";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { Post, setPosts } from "../../state/slices/postsSlice";
import { Divider, Stack } from "@mui/material";
import { useInfiniteQuery } from "@tanstack/react-query";
import { InView, useInView } from "react-intersection-observer";
import { queryClient } from "../../utilities/queryClient";
import PageLoader from "../../pages/PageLoader";

const PostList = () => {
  const { posts } = useAppSelector((state) => state.posts);
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);
  const fetchPosts = async ({ pageParam = 1 }) => {
    setLoading(true);
    try {
      const resultPosts = await axios.get("http://localhost:3001/api/posts", {
        params: {
          userId: user.userId,
          offset: pageParam,
        },
      });

      if (pageParam > 1) {
        dispatch(setPosts([...posts, ...resultPosts.data] as Post[]));
      } else {
        dispatch(setPosts(resultPosts.data as Post[]));
      }

      return resultPosts.data;
    } catch (e) {
      console.log(e.message);
    } finally {
      setLoading(false);
    }
  };

  const { error, status, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
    {
      queryKey: ["timeline"],
      queryFn: fetchPosts,
      initialPageParam: 1,
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.length ? allPages.length + 1 : undefined;
      },
    }
  );

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

  useEffect(() => {
    queryClient.clear();
    fetchPosts({ pageParam: 1 });
  }, [user.userId]);

  if (status === "pending") return <PageLoader />;
  if (status === "error") return <div>{error.message}</div>;

  return (
    <Stack divider={<Divider />}>
      {posts.map((o, index) => (
        <PostItem key={index} post={o} />
      ))}

      <div ref={ref}>{isFetchingNextPage && "Loading..."}</div>
      <Divider />
    </Stack>
  );
};

export default PostList;
