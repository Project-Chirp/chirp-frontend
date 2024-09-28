import { useAuth0 } from "@auth0/auth0-react";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useCallback, useState } from "react";

export type SendRequestProps = {
  endpoint: string;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  headers?: { [key: string]: string };
  body?: any;
  params?: any;
};

const useAxios = () => {
  const [data, setData] = useState<AxiosResponse>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<AxiosError | null>(null);
  const { getAccessTokenSilently } = useAuth0();

  const sendRequest = useCallback(
    async ({
      endpoint,
      method = "GET",
      headers = {},
      body = null,
      params = null,
    }: SendRequestProps): Promise<any> => {
      setLoading(true);
      setError(null);
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

        setData(response.data);
        return response.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setError(error.response?.data?.message || error.message);
        } else {
          setError(error.message);
        }
      } finally {
        setLoading(false);
      }
    },
    [getAccessTokenSilently]
  );

  return { data, loading, error, sendRequest };
};

export default useAxios;
