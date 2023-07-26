import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { useState } from "react";

const useAxios = () => {
  const [response, setResponse] = useState<AxiosResponse>();
  const [error, setError] = useState<AxiosError>();
  const [loading, setLoading] = useState(true);

  const fetchData = async (params: AxiosRequestConfig) => {
    try {
      const response = await axios.request(params);
      setResponse(response);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const sendRequest = (axiosParams: AxiosRequestConfig) => {
    fetchData(axiosParams);
  };

  return { response, error, loading, sendRequest };
};

export default useAxios;
