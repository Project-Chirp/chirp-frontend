import axios from "axios";
import { useState, useEffect } from "react";
import MessagesListItem, { LatestMessageDetails } from "./MessagesListItem";
import { useAppSelector } from "../../state/hooks";
import { List } from "@mui/material";
import { useNavigate } from "react-router-dom";

const MessagesList = () => {
  const [selected, setSelected] = useState(0);
  const user = useAppSelector((state) => state.user);
  const [latestMessageDetails, setlatestMessageDetails] = useState<
    LatestMessageDetails[]
  >([]);
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
      {latestMessageDetails.map((o, index) => (
        <MessagesListItem
          key={index}
          latestMessageDetails={o}
          onClick={() => {
            setSelected(index);
            navigate(`/messages/${user.userId}/${o.otherUserId}`);
          }}
          selected={selected === index}
        />
      ))}
    </List>
  );
};

export default MessagesList;
