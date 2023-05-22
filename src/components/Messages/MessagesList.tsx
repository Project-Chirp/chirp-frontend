import axios from "axios";
import { useState, useEffect } from "react";
import MessagesListItem, { LatestMessageDetails } from "./MessagesListItem";

const MessagesList = () => {
  const [latestMessageDetails, setlatestMessageDetails] = useState<
    LatestMessageDetails[]
  >([]);

  useEffect(() => {
    const fetchMessages = async () => {
      const result = await axios.get("http://localhost:3001/api/messages");
      setlatestMessageDetails(result.data as LatestMessageDetails[]);
    };
    fetchMessages();
  }, []);

  return (
    <>
      {latestMessageDetails.map((o, index) => (
        <MessagesListItem latestMessageDetails={o} key={index} />
      ))}
    </>
  );
};

export default MessagesList;
