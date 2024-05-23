import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../state/hooks";
import axios from "axios";
import { Post, clearPosts, setPosts } from "../state/slices/postsSlice";
import { Message, setMessages } from "../state/slices/messagesSlice";

type UseFetchMessagesProps = {
  url: string;
  params?: {};
};

const useFetchMessages = ({ url, params }: UseFetchMessagesProps) => {
  const { messages } = useAppSelector((state) => state.messages);
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);

  const fetchMessages = async (pageParam = 1) => {
    setLoading(true);

    try {
      const result = await axios.get(url, {
        params: {
          ...params,
          offset: pageParam,
        },
      });

      pageParam > 1
        ? dispatch(setMessages([...messages, ...result.data] as Message[]))
        : dispatch(setMessages(result.data as Message[]));

      return result.data;
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { fetchMessages, loading };
};

export default useFetchMessages;
