import { useAuth0 } from "@auth0/auth0-react";
import axios, { AxiosRequestConfig } from "axios";
import { useCallback } from "react";

const useAxios = () => {
  const { getAccessTokenSilently } = useAuth0();

  const sendRequest = useCallback(
    async (config: AxiosRequestConfig, endpoint: string): Promise<any> => {
      try {
        const token = await getAccessTokenSilently();

        if (!import.meta.env.VITE_BASE_URL) {
          throw new Error("Base URL is not defined");
        }

        const response = await axios.request({
          ...config,
          url: `${import.meta.env.VITE_BASE_URL}/${endpoint}`,
          headers: { ...config.headers, Authorization: `Bearer ${token}` },
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
