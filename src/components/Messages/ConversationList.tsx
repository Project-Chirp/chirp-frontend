import axios from "axios";
import { useEffect, useState } from "react";
import ConversationListItem from "./ConversationListItem";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { Box, Divider, IconButton, List, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  setConversations,
  setSelectedConversation,
} from "../../state/slices/messagesSlice";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import SearchBar from "../Common/SearchBar";
import CreateMessageModal from "./CreateMessageModal/CreateMessageModal";
import InfiniteScroll from "react-infinite-scroll-component";
import { useInfiniteQuery } from "@tanstack/react-query";
import { queryClient } from "../../utilities/queryClient";
import PageLoader from "../../pages/PageLoader";

const styles = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    paddingTop: 2,
    paddingX: 2,
  },
  searchBarContainer: { padding: 1 },
};

const ConversationList = () => {
  const { conversations, selectedConversation } = useAppSelector(
    (state) => state.messages
  );
  const [messageModal, showMessageModal] = useState(false);
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const fetchMessages = async ({ pageParam = 1 }) => {
    setLoading(true);
    try {
      const result = await axios.get("http://localhost:3001/api/messages", {
        params: {
          userId: user.userId,
          offset: pageParam,
        },
      });

      if (pageParam > 1) {
        dispatch(setConversations([...conversations, ...result.data]));
      } else {
        dispatch(setConversations(result.data));
      }

      return result.data;
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  const { error, status, hasNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: ["expandedposts"],
    queryFn: fetchMessages,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length ? allPages.length + 1 : undefined;
    },
  });

  useEffect(() => {
    queryClient.clear();
    fetchMessages({ pageParam: 1 });
  }, [user]);

  if (status === "pending") return <PageLoader />;
  if (status === "error") return <div>{error.message}</div>;

  return (
    <Box>
      <Box sx={styles.header}>
        <Typography variant="h6">Messages</Typography>
        <IconButton onClick={() => showMessageModal(true)}>
          <ChatOutlinedIcon />
        </IconButton>
      </Box>
      <Box sx={styles.searchBarContainer}>
        <SearchBar placeholder="Search Messages" />
      </Box>
      <Divider />
      <List component="div">
        <InfiniteScroll
          dataLength={conversations.length}
          next={fetchNextPage}
          hasMore={hasNextPage}
          loader={<PageLoader />}
        >
          {conversations.map((o) => (
            <ConversationListItem
              key={o.otherUserId}
              conversation={o}
              onClick={() => {
                dispatch(
                  setSelectedConversation({
                    displayName: o.displayName,
                    username: o.username,
                    userId: o.otherUserId,
                  })
                );
                navigate(`/messages/${user.userId}/${o.otherUserId}`);
              }}
              selected={selectedConversation.userId === o.otherUserId}
            />
          ))}
        </InfiniteScroll>
      </List>
      <CreateMessageModal
        onClose={() => showMessageModal(false)}
        open={messageModal}
      />
    </Box>
  );
};

export default ConversationList;
