import { useEffect } from "react";
import PostItem from "../Posts/PostItem";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { Post, setPosts } from "../../state/slices/postsSlice";
import { Box, Divider, Stack } from "@mui/material";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { queryClient } from "../../utilities/queryClient";
import PageLoader from "../../pages/PageLoader";

type ProfileRepliesProps = {
  userId: number;
};

const ProfileReplies = ({ userId }: ProfileRepliesProps) => {
  const { posts } = useAppSelector((state) => state.posts);
  const dispatch = useAppDispatch();

  const fetchPosts = async ({ pageParam = 1 }) => {
    try {
      const result = await axios.get(
        "http://localhost:3001/api/profile/getUserReplies",
        {
          params: {
            visitedUserId: userId,
            offset: pageParam,
          },
        }
      );

      if (pageParam > 1) {
        dispatch(setPosts([...posts, ...result.data] as Post[]));
      } else {
        dispatch(setPosts(result.data as Post[]));
      }

      return result.data;
    } catch (error) {
      console.error("error fetching posts:", error);
    }
  };

  const { error, status, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
    {
      queryKey: ["replies"],
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
  }, [userId]);

  if (status === "pending") return <PageLoader />;
  if (status === "error") return <Box>{error.message}</Box>;

  return (
    <Stack divider={<Divider />}>
      {posts.map((o, index) => (
        <PostItem key={index} post={o} />
      ))}

      <Box ref={ref}>{isFetchingNextPage && "Loading..."}</Box>
      <Divider />
    </Stack>
  );
};

export default ProfileReplies;
