import { CSSProperties, ReactNode, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import PageLoader from "../../pages/PageLoader";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Box } from "@mui/material";
import { QueryClient } from "@tanstack/react-query";
import useFetchData from "../../utilities/useFetchData";
import { AnyAction } from "redux";

type InfiniteScrollListProps<T> = {
  children: ReactNode;
  dataLength: number;
  inverse?: boolean;
  fetchParams?: {};
  queryKey: string;
  scrollableTarget?: ReactNode;
  setData: (data: T[]) => AnyAction;
  selectData: (state: any) => T[];
  style?: CSSProperties;
  url: string;
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
  fetchParams,
  queryKey,
  scrollableTarget,
  setData,
  selectData,
  style,
  url,
}: InfiniteScrollListProps<T>) => {
  const { fetchData } = useFetchData({
    url,
    params: fetchParams,
    setData,
    selectData,
  });

  useEffect(() => {
    queryClient.clear();
    fetchData(1);
  }, [JSON.stringify(fetchParams), url]);

  const { error, status, hasNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: [queryKey],
    queryFn: ({ pageParam }) => fetchData(pageParam),
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
