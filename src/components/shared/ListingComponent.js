import React from "react";
import { styled, useMediaQuery } from "@mui/material";
import { CustomReactTable } from "./CustomReactTable";
import ListItemCard from "./ListItemCard";
import ListPagination from "./Pagination";
import { ListingContainer } from "../../styles";
import { CustomSearchField } from "./CustomSearchField";

const NoDataContainer = styled("div")({
  height:'30%',
  width:'100%',
  display:"flex",
  flexDirection:'column',
  justifyContent:'center',
  alignItems:'center',
  paddingTop:'30px'
})

export function ListingComponent({
  columns,
  data,
  menuDetails,
  topMenuDetails,
  bottomMenuDetails,
  subMenuDetails,
  isPrimaryList,
  isLoading,
  disablePagination,
  disableSort,
  disableColumnHiding,
  onPageNumberChange,
  onChangePageSize,
  pageSize,
  currentPage,
  count,
  manualSort,
  pagination,
  disableLayout,
  disableListSearch,
  maxHeight,
}) {
  const isMobile = useMediaQuery("(max-width: 600px)");
  const Layout = disableLayout ? React.Fragment : ListingContainer;

  return (
    <Layout>
      {isMobile ? (
        <>
          {!disableListSearch ? <CustomSearchField /> : null}
          {data && data.length ? (
            <>
              {data.map((item, index) => (
                <ListItemCard
                  key={index}
                  menuDetails={menuDetails}
                  topMenuDetails={topMenuDetails || []}
                  bottomMenuDetails={bottomMenuDetails || []}
                  data={item}
                  isPrimaryList={isPrimaryList}
                  columnData={columns}
                  subMenuDetails={subMenuDetails}
                  index={index}
                />
              ))}
              <ListPagination
                count={count}
                onPageNumberChange={onPageNumberChange}
                onChangePageSize={onChangePageSize}
              />
            </>
          ) : (
            <NoDataContainer>
              <div>No Data</div>
              <div>There seems to be no data found.</div>
            </NoDataContainer>
          )}
        </>
      ) : (
        <CustomReactTable
          rawData={data}
          columnData={columns}
          disablePagination={disablePagination}
          disableColumnHiding={disableColumnHiding}
          onPageNumberChange={onPageNumberChange}
          onChangePageSize={onChangePageSize}
          pageSize={pageSize}
          currentPage={currentPage}
          count={count}
          isLoading={isLoading}
          disableSort={disableSort}
          manualSort={manualSort}
          pagination={pagination}
          maxHeight={maxHeight}
        />
      )}
    </Layout>
  );
}
