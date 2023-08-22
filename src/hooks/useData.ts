import { useEffect, useState } from "react";

export const useData = <T>(url: string, isRequest = true) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!isRequest) return;
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch("https://swapi.dev/api/" + url, {
          signal,
        });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const responseData = await response.json();
        setData(responseData);
      } catch (error) {
        if (!signal.aborted) {
          setError(error as Error);
        }
      } finally {
        if (!signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      controller.abort();
    };
  }, [isRequest, url]);

  return { data, loading, error };
};
