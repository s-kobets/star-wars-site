import { useEffect, useState } from "react";

export const useData = <T>(url: string) => {
  const [state, setState] = useState<T>();

  useEffect(() => {
    const dataFetch = async () => {
      const data = await (await fetch("https://swapi.dev/api/" + url)).json();

      setState(data);
    };

    dataFetch();
  }, [url]);

  return { data: state, loading: !state };
};
