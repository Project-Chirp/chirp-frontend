import axios from "axios";
import { useState, useEffect } from "react";
import { List } from "@mui/material";
import { useAppSelector } from "../../state/hooks";
import MessagesModalListItem from "./MessagesModalListItem";

export type DMList = {
  displayName: string;
  username: string;
};

const MessagesList = () => {
  const user = useAppSelector((state) => state.user);
  const [dmList, setDMList] = useState<DMList[]>([]);

  useEffect(() => {
    const fetchDMList = async () => {
      const result = await axios.get(
        "http://localhost:3001/api/messages/dmList",
        {
          params: {
            userId: user.userId,
          },
        }
      );
      setDMList(result.data as DMList[]);
    };
    fetchDMList();
  }, [user]);

  return (
    <List component="div">
      {dmList.map((o, index) => (
        <MessagesModalListItem dmList={o} key={index} />
      ))}
    </List>
  );
};

export default MessagesList;
