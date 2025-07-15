import $fetch from "@/lib/$fetch";
import { useEffect, useState } from "react";

export default function useGet(url, params) {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState();

  async function getData() {
    try {
      setIsLoading(true);
      const response = await $fetch.get(url, params);
      setData(response);
    } catch (error) {
      setIsError(true);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url, params]);

  return { data, isLoading, isError, error, refresh: getData };
}
