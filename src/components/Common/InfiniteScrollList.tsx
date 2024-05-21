import React, { ReactNode, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import PageLoader from "../../pages/PageLoader";
import { useInfiniteQuery } from "@tanstack/react-query";
import { queryClient } from "../../utilities/queryClient";
import useFetchPosts from "../../utilities/useFetchPosts";
import { Box } from "@mui/material";

type InfiniteScrollListProps = {
  dataLength: number;
  url: string;
  fetchParams: {};
  children: ReactNode;
};

const InfiniteScrollList = ({
  dataLength,
  url,
  fetchParams,
  children,
}: InfiniteScrollListProps) => {
  const { fetchPosts, clearAllPosts } = useFetchPosts(url, fetchParams);

  useEffect(() => {
    clearAllPosts();
    queryClient.clear();
    fetchPosts(1);
  }, [JSON.stringify(fetchParams)]);

  const { error, status, hasNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: ["likes"],
    queryFn: ({ pageParam }) => fetchPosts(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length ? allPages.length + 1 : undefined;
    },
  });

  if (status === "pending") return <PageLoader />;
  if (status === "error") return <Box>{error.message}</Box>; // TODO: Create an Error Component
  return (
    <InfiniteScroll
      dataLength={dataLength}
      next={fetchNextPage}
      hasMore={hasNextPage}
      loader={<PageLoader />}
    >
      {children}
    </InfiniteScroll>
  );
};

export default InfiniteScrollList;
