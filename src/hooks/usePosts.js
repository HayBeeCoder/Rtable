import { useState, useEffect, useContext } from "react";
import { useQuery } from "react-query";
import reactTableContext from "../stores/react-table-context";
import axios from "axios";

export const usePostsList = () => {
  const [data, setData] = useState([]);

  const reactTableCtx = useContext(reactTableContext);

  // Object using for pagination
  const {
    rangePerPageSize,
    pageIndex,
    maxTotalCountPage
  } = reactTableCtx.tableState;

  // This is not updating the page and the pagination button is not working either
  const fetchPostsList = (rangePerPageSize, pageIndex) =>
    axios.get(
      `https://jsonplaceholder.typicode.com/posts?_limit=${rangePerPageSize}&_page=${pageIndex}`
    );

  const { data: postData, isSuccess, ...rest } = useQuery(
    ["posts", pageIndex, maxTotalCountPage],
    () => fetchPostsList(rangePerPageSize, pageIndex),
    {
      staleTime: 2000,
      keepPreviousData: true // This is to keep the previous data just in case someone wants to go back to the previous page
    }
  );

  useEffect(() => {
    setData([]);
    if (postData && isSuccess) {
      const totalPageCount = postData.headers["x-total-count"];
      // We want to use this value on the useTableInstance with the object pageCount
      reactTableCtx.setMaxTotalPage({
        totalPageValue: totalPageCount
      });

      setData(postData?.data);
    }
  }, [postData, isSuccess]);

  return { data, ...rest };
};
