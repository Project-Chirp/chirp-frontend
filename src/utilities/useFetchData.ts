import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../state/hooks";
import axios from "axios";
import { AnyAction } from "redux";

type UseFetchDataProps<T> = {
  url: string;
  params?: {};
  setData: (data: T[]) => AnyAction;
  selectData: (state: any) => T[];
};

const useFetchData = <T>({
  url,
  params,
  setData,
  selectData,
}: UseFetchDataProps<T>) => {
  const data = useAppSelector(selectData);
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);

  const fetchData = async (pageParam = 1) => {
    setLoading(true);

    try {
      const result = await axios.get(url, {
        params: {
          ...params,
          offset: pageParam,
        },
      });

      const newData = result.data as T[];

      pageParam > 1
        ? dispatch(setData([...data, ...newData] as T[]))
        : dispatch(setData(newData as T[]));

      return result.data;
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { fetchData, loading };
};

export default useFetchData;
