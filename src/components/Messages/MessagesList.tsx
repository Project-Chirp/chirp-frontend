import axios from "axios";
import { useState, useEffect } from "react";
import MessagesListItem, { LatestMessageDetails } from "./MessagesListItem";

const MessagesList = () => {
  const [messages, setMessages] = useState<LatestMessageDetails[]>([]);

  useEffect(() => {
    const fetchMessages = async () => {
      const result = await axios.get("http://localhost:3001/api/posts");
      setMessages(result.data as LatestMessageDetails[]);
    };
    fetchMessages();
  }, []);

  return (
    <MessagesListItem
      latestMessageDetails={{
        displayName: "Buzz",
        username: "itsthebuzzkill",
        message: "hi",
        timestamp: "March 12th",
      }}
    />
  );
};

export default MessagesList;
