import React, { CSSProperties, ReactNode, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import PageLoader from "../../pages/PageLoader";
import { useInfiniteQuery } from "@tanstack/react-query";
import useFetchPosts from "../../utilities/useFetchPosts";
import { Box } from "@mui/material";
import useFetchMessages from "../../utilities/useFetchMessages";
import { QueryClient } from "@tanstack/react-query";

type InfiniteScrollListProps = {
  children: ReactNode;
  dataLength: number;
  inverse?: boolean;
  fetchParams?: {};
  queryKey: string;
  scrollableTarget?: ReactNode;
  style?: CSSProperties;
  url: string;
};

const styles = {
  list: {
    overflow: "hidden",
  },
};

const InfiniteScrollList = ({
  children,
  dataLength,
  inverse = false,
  fetchParams,
  queryKey,
  scrollableTarget,
  style,
  url,
}: InfiniteScrollListProps) => {
  const { fetchPosts } = useFetchPosts({ url, params: fetchParams });
  const { fetchMessages } = useFetchMessages({ url, params: fetchParams });

  useEffect(() => {
    queryClient.clear();
    inverse ? fetchMessages(1) : fetchPosts(1);
  }, [JSON.stringify(fetchParams), url]);

  const { error, status, hasNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: [queryKey],
    queryFn: ({ pageParam }) =>
      inverse ? fetchMessages(pageParam) : fetchPosts(pageParam),
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
      hasMore={hasNextPage}
      inverse={inverse}
      loader={<PageLoader />}
      next={fetchNextPage}
      scrollableTarget={scrollableTarget}
      style={{ ...style, ...styles.list }}
    >
      {children}
    </InfiniteScroll>
  );
};

export default InfiniteScrollList;

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // default: true
    },
  },
});
