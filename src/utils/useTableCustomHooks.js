import queryString from "query-string";
import { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { sortedValues } from "./common";
import { createQueryParams } from "./queryParams";

export default function useTableCustomHooks(path) {
  const location = useLocation();
  const navigate = useNavigate();

  const pageParams = queryString.parse(location?.search);
  const pageSize = parseInt(pageParams?.pageSize) || 10;
  const currentPage = parseInt(pageParams?.currentPage) || 1;

  const search = location.search;
  const searchParam = useMemo(() => new URLSearchParams(search), [search]);
  const searchdata = searchParam?.get("search");

  let filterdata = useMemo(
    () =>
      searchParam?.get("filter") ? JSON.parse(searchParam?.get("filter")) : [],
    [searchParam]
  );

  const sortData = useMemo(
    () =>
      searchParam?.get("sort") ? JSON.parse(searchParam?.get("sort")) : [],
    [searchParam]
  );
  const onPageNumberChange = (page) => {
    const newParams = createQueryParams({
      ...pageParams,
      pageSize,
      currentPage: page,
    });
    return navigate(`${path}?${newParams}`);
  };

  const onChangePageSize = (size) => {
    const newParams = createQueryParams({
      ...pageParams,
      pageSize: size,
      currentPage: size === pageSize ? currentPage : 1,
    });
    return navigate(`${path}?${newParams}`);
  };

  const handleTableDatas = (searchFields, columnDatas, defaultSortedValues) => {
    const offset = pageSize * (currentPage - 1);
    const listParams = {
      pagination: {
        limit: pageSize,
        offset,
      },
      search: {
        fields: searchFields,
        value: searchdata ? searchdata : "",
      },
      sorting:
        sortData.length === 0
          ? defaultSortedValues || [{ column: "createdAt", order: "desc" }]
          : sortedValues(columnDatas, sortData) || [],
      filters: filterdata?.length !== 0 ? filterdata : [],
    };
    return listParams;
  };

  const tableReRenderActions = () => {
    return { pageSize, sortData, searchdata, currentPage, filterdata };
  };

  return {
    onPageNumberChange,
    onChangePageSize,
    handleTableDatas,
    tableReRenderActions,
  };
}
