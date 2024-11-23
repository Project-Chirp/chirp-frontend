import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { useCallback } from "react";

export type SendRequestProps = {
  endpoint: string;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  headers?: { [key: string]: string };
  body?: any;
  params?: any;
};

const useAxios = () => {
  const { getAccessTokenSilently } = useAuth0();

  const sendRequest = useCallback(
    async ({
      endpoint,
      method = "GET",
      headers = {},
      body = null,
      params = null,
    }: SendRequestProps): Promise<any> => {
      try {
        const token = await getAccessTokenSilently();

        if (!import.meta.env.VITE_BASE_URL) {
          throw new Error("Base URL is not defined");
        }

        const response = await axios.request({
          method: method,
          url: `${import.meta.env.VITE_BASE_URL}/${endpoint}`,
          headers: { ...headers, Authorization: `Bearer ${token}` },
          data: body,
          params,
        });

        return response.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.log(error.message);
        } else {
          console.log(error.message);
        }
      }
    },
    [getAccessTokenSilently]
  );

  return { sendRequest };
};

export default useAxios;
