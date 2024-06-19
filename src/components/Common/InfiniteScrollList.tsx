import { CSSProperties, ReactNode, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import PageLoader from "../../pages/PageLoader";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Box } from "@mui/material";
import { QueryClient } from "@tanstack/react-query";

type InfiniteScrollListProps<T> = {
  children: ReactNode;
  dataLength: number;
  inverse?: boolean;
  queryFn: (pageParam: number) => Promise<any>;
  queryKey: string;
  scrollableTarget?: ReactNode;
  scrollThreshold?: number | string;
  style?: CSSProperties;
};

const styles = {
  list: {
    overflow: "hidden",
  },
};

const InfiniteScrollList = <T extends {}>({
  children,
  dataLength,
  inverse = false,
  queryKey,
  queryFn,
  scrollableTarget,
  scrollThreshold = 0.9,
  style,
}: InfiniteScrollListProps<T>) => {
  useEffect(() => {
    queryClient.clear();
    queryFn(1);
  }, []);

  const { error, status, hasNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: [queryKey],
    queryFn: ({ pageParam }) => queryFn(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length ? allPages.length + 1 : undefined;
    },
  });

  console.log(hasNextPage);
  console.log(fetchNextPage);

  if (status === "pending") {
    return <PageLoader />;
  }
  if (status === "error") return <Box>{error.message}</Box>; // TODO: Create an Error Component
  return (
    <InfiniteScroll
      dataLength={dataLength}
      hasMore={hasNextPage}
      inverse={inverse}
      loader={<PageLoader />}
      next={fetchNextPage}
      scrollableTarget={scrollableTarget}
      scrollThreshold={scrollThreshold}
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
