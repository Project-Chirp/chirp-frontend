import { useAuth0 } from "@auth0/auth0-react";
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { useCallback, useState } from "react";

const useAxios = () => {
  const [response, setResponse] = useState<AxiosResponse>();
  const [error, setError] = useState<AxiosError>();
  const [loading, setLoading] = useState(true);
  const { getAccessTokenSilently } = useAuth0();

  const sendRequest = useCallback(
    async (params: AxiosRequestConfig) => {
      setLoading(params.method === "GET" || params.method === "get");

      try {
        const token = await getAccessTokenSilently();
        const result = await axios.request({
          ...params,
          headers: { Authorization: `Bearer ${token}` },
        });
        setResponse(result);
        return result.data;
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    },
    [getAccessTokenSilently]
  );

  return { response, error, loading, sendRequest };
};

export default useAxios;
