import Table from "custom_react_table7";
import { createSearchParams, useLocation, useNavigate } from "react-router-dom";
import { parseQueryParams } from "../../utils/queryParams";

export function CustomReactTable({
  columnData,
  rawData,
  style,
  columnSize,
  count,
  pageSize,
  currentPage,
  onPageNumberChange,
  onChangePageSize,
  disablePagination,
  disableColumnHiding,
  disableSort,
  disableRowSelection = true,
  selectedRows,
  isLoading,
  maxHeight,
  manualSort,
  pagination,
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const pathName = location.pathname;
  const pageParams = parseQueryParams(location?.search);

  const tableSortValues = (value) => {
    const data = {
      ...pageParams,
      sort: JSON.stringify(value),
    };
    if (value?.length === 0) {
      delete data?.sort;
    }
    return navigate(
      {
        pathName: `${pathName}`,
        search: `?${createSearchParams({
          ...data,
        })}`,
      },
      {
        state: location?.state || null,
      }
    );
  };
  return (
    <>
      <div>
        <Table
          columnData={columnData}
          rawData={rawData}
          selectRows={selectedRows}
          columnSize={columnSize ? columnSize : true}
          disableColumnHiding={
            disableColumnHiding ? disableColumnHiding : false
          }
          disableRowSelection={disableRowSelection}
          pagination={!pagination}
          disablePagination={disablePagination}
          pageSizes={pageSize}
          currentPage={currentPage}
          onChangePageSize={onChangePageSize}
          onPageNumberChange={onPageNumberChange}
          pageCount={count}
          disableColumnResize={true}
          disableSort={disableSort}
          manualSort={manualSort || false}
          onSort={tableSortValues}
          isLoading={isLoading || false}
          style={{
            table: {
              maxHeight: maxHeight || "calc(100vh - 280px)",
              "&::-webkit-scrollbar": {
                width: "5px",
                height: "5px",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "#6E6E6E60",
                borderRadius: 5,
              },
              "&::-webkit-scrollbar-thumb:hover": {
                background: "#555",
              },
            },
            mainContainer: {
              maxWidth: "100%",
            },
            ".tableHead": {
              maxWidth: "100%",
              userSelect: "none",
              color: "#006BBD",
            },
            ".css1kciki3 .tableHead": {
              backgroundColor: "rgb(0, 107, 189)",
            },
            th: {
              font: "normal normal bold 14px/19px sans-serif !important",
              display: "flex !important",
              height: "64px !important",
              backgroundColor: "#006BBD",
              color: "#fff",
            },
            body: {
              font: "normal normal normal 14px/19px sans-serif !important",
            },
            headerText: {
              overflow: "visible",
              userSelect: "none",
            },
            tr: {
              display: "flex",
              alignItems: "center",
              height: "auto",
              ".primaryRow": {
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              },
              ".primaryRowData": {
                display: "flex",
                alignItems: "center",
              },
            },
            td: {
              padding: 10,
              paddingRight: 30,
              ".MuiBox-root": {
                textOverflow: "ellipsis",
              },
            },
            loaderContainer: {
              display: "none !important",
            },
            tableHead: {
              backgroundColor: "rgb(0, 107, 189)",
            },
            pagination: {
              color: "#000000DE",
              font: "normal normal normal 14px/19px sans-serif !important",
              backgroundColor: "#A2BEFB !important",
            },
            ...style,
          }}
        />
      </div>
    </>
  );
}
