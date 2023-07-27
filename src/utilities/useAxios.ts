import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { useState } from "react";

const useAxios = () => {
  const [response, setResponse] = useState<AxiosResponse>();
  const [error, setError] = useState<AxiosError>();
  const [loading, setLoading] = useState(true);

  const sendRequest = async (axiosParams: AxiosRequestConfig) => {
    try {
      const response = await axios.request(axiosParams);
      setResponse(response);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { response, error, loading, sendRequest };
};

export default useAxios;
