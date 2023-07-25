import axios from "axios";
import React, { useState, useEffect } from "react";

type UseAxiosProps = {
  url: string;
  method: string;
  headers?: string;
  body?: string;
};

const useAxios = ({ url, method, headers, body }: UseAxiosProps) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {};
};

export default useAxios;
