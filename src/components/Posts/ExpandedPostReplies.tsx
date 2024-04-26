import { useEffect, useState } from "react";
import PostItem from "./PostItem";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { Post, setPosts } from "../../state/slices/postsSlice";
import { Divider, Stack } from "@mui/material";
import { InView, useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "@tanstack/react-query";
import { queryClient } from "../../utilities/queryClient";
import PageLoader from "../../pages/PageLoader";

type ExpandedPostRepliesProps = {
  postId: number;
};

const ExpandedPostReplies = ({ postId }: ExpandedPostRepliesProps) => {
  const { posts } = useAppSelector((state) => state.posts);
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

  const fetchPosts = async ({ pageParam = 1 }) => {
    setLoading(true);
    try {
      const resultReplies = await axios.get(
        "http://localhost:3001/api/posts/fetchReplies",
        {
          params: {
            userId: user.userId,
            postId: postId,
            offset: pageParam,
          },
        }
      );

      if (pageParam > 1) {
        dispatch(setPosts([...posts, ...resultReplies.data] as Post[]));
      } else {
        dispatch(setPosts(resultReplies.data as Post[]));
      }

      return resultReplies.data;
    } catch (e) {
      console.log(e.message);
    } finally {
      setLoading(false);
    }
  };

  const { error, status, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
    {
      queryKey: ["expandedposts"],
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
  }, [user.userId, postId]);

  if (status === "pending") return <PageLoader />;
  if (status === "error") return <div>{error.message}</div>;

  return (
    <Stack divider={<Divider />}>
      {posts
        .filter((o) => o.parentPostId === postId)
        .map((o, index) => (
          <PostItem key={index} post={o} />
        ))}

      <div ref={ref}>{isFetchingNextPage && "Loading..."}</div>
      <Divider />
    </Stack>
  );
};

export default ExpandedPostReplies;
