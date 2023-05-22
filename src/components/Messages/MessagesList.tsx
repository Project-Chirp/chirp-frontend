import axios from "axios";
import { useState, useEffect } from "react";
import MessagesListItem, { LatestMessageDetails } from "./MessagesListItem";
import { useAppSelector } from "../../state/hooks";

const MessagesList = () => {
  const user = useAppSelector((state) => state.user);
  const [latestMessageDetails, setlatestMessageDetails] = useState<
    LatestMessageDetails[]
  >([]);

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
    <>
      {latestMessageDetails.map((o, index) => (
        <MessagesListItem latestMessageDetails={o} key={index} />
      ))}
    </>
  );
};

export default MessagesList;
