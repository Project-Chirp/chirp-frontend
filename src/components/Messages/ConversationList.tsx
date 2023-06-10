import axios from "axios";
import { useState, useEffect } from "react";
import ConversationListItem, {
  LatestMessageDetails,
} from "./ConversationListItem";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { List } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { setSelectedConversation } from "../../state/slices/messagesSlice";

const ConversationList = () => {
  const selectedConversation = useAppSelector((state) => state.messages);
  const [latestMessageDetails, setlatestMessageDetails] = useState<
    LatestMessageDetails[]
  >([]);
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchMessages = async () => {
      const result = await axios.get("http://localhost:3001/api/messages", {
        params: {
          userId: user.userId,
        },
      });
      setlatestMessageDetails(result.data as LatestMessageDetails[]);
    };
    fetchMessages();
  }, [user]);

  return (
    <List component="div">
      {latestMessageDetails.map((o) => (
        <ConversationListItem
          key={o.otherUserId}
          latestMessageDetails={o}
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
    </List>
  );
};

export default ConversationList;
