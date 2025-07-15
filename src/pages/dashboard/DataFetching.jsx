import { Button } from "@/components/ui/button";
import { Title } from "@/components/ui/title";
import useGet from "@/hooks/useGet";
import $fetch from "@/lib/$fetch";
import { useEffect, useState } from "react";
// function useEffect(callback, depend) {}
export default function DataFethcing() {
  //   const [data, setData] = useState();
  //   const [iLoading, setIsLoading] = useState(true);
  const [params, setParams] = useState({
    limit: 10,
    skip: 0,
  });

  //   async function getData() {
  //     setIsLoading(true);
  //     const response = await $fetch.get(`https://dummyjson.com/products`, params);
  //     setData(response);
  //     setIsLoading(false);
  //   }

  //   //   getData();

  //   useEffect(() => {
  //     getData();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  //   }, [params]);

  const { data, isLoading, refresh } = useGet(
    "https://dummyjson.com/products",
    params
  );

//   const { data: category, isLoading: laodingCategory, refresh: refreshCategory } = useGet(
//     "https://dummyjson.com/products",
//     params
//   );

  function handleNext() {
    setParams((old) => ({ ...old, skip: old.skip + 10 }));
  }
  function handlePrev() {
    setParams((old) => ({ ...old, skip: old.skip - 10 }));
  }

  return (
    <div>
      <Title
        title={"Data Fetching"}
        caption={"Practice about data fetching in react."}
      />
      <div className="flex gap-2">
        <Button onClick={refresh}>Refresh</Button>
        <Button onClick={handlePrev}>Prev</Button>
        <Button onClick={handleNext}>Next</Button>
      </div>
      <pre>{JSON.stringify(params, null, 2)}</pre>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <pre>{JSON.stringify(data, null, 2)}</pre>
      )}
    </div>
  );
}
