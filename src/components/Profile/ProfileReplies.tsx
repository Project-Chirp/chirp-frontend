import { useEffect } from "react";
import PostItem from "../Posts/PostItem";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { Post, setPosts } from "../../state/slices/postsSlice";
import { Box, Divider, List, Stack, Typography } from "@mui/material";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { queryClient } from "../../utilities/queryClient";
import PageLoader from "../../pages/PageLoader";
import InfiniteScroll from "react-infinite-scroll-component";

type ProfileRepliesProps = {
  userId: number;
};

const styles = {
  stack: {
    overflow: "auto",
  },
};

const ProfileReplies = ({ userId }: ProfileRepliesProps) => {
  const { posts } = useAppSelector((state) => state.posts);
  const dispatch = useAppDispatch();

  useEffect(() => {
    queryClient.clear();
    fetchPosts({ pageParam: 1 });
  }, [userId]);

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

  const { error, status, hasNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: ["replies"],
    queryFn: fetchPosts,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length ? allPages.length + 1 : undefined;
    },
  });

  if (status === "pending") return <PageLoader />;
  if (status === "error") return <Box>{error.message}</Box>;

  return (
    <Stack sx={styles.stack} id={"scrollable"}>
      <InfiniteScroll
        dataLength={posts.length}
        next={fetchNextPage}
        hasMore={hasNextPage}
        loader={<h4>Loading...</h4>}
        scrollableTarget={"scrollable"}
      >
        {posts.map((o, index) => (
          <Box key={index}>
            <PostItem post={o} />
            <Divider />
          </Box>
        ))}
      </InfiniteScroll>
    </Stack>
  );
};

export default ProfileReplies;
