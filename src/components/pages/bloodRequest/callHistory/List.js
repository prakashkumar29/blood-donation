import useTableCustomHooks from "../../../../utils/useTableCustomHooks";
import { useQuery } from "react-query";
import { getApiServices } from "../../../../api/api";
import { DONOR_WITH_CALL_HISTORY } from "../../../../api/apiPaths";
import { ListTopbar, ListingComponent } from "../../../shared";
import { CALL_HISTORY } from "../../../../routes/routePaths";
import {
  columns,
  searchFields,
} from "../../../../constants/bloodRequest/callHistory";
import { useSelector } from "react-redux";

function List() {
  
  const { id: userId } = useSelector((state) => state?.userInfo);
  const {
    onPageNumberChange,
    onChangePageSize,
    handleTableDatas,
    tableReRenderActions,
  } = useTableCustomHooks(CALL_HISTORY);
  const listParams = handleTableDatas(searchFields, columns);
  const { pageSize, currentPage } = tableReRenderActions();

  const { data, isLoading } = useQuery(["currentRequests", listParams], () =>
    getApiServices(`${DONOR_WITH_CALL_HISTORY}/${userId}`, {
      ...listParams,
      sorting:
        listParams?.sorting[0]?.column === "createdAt"
          ? []
          : listParams?.sorting,
    })
  );

  return (
    <>
      <ListTopbar
        label="CALL HISTORY"
        disableNewForm
        disableFilter={true}
        listPath={DONOR_WITH_CALL_HISTORY}
      />
      <ListingComponent
        data={data?.data?.donorParameter?.callHistory || []}
        columns={columns || []}
        isLoading={isLoading}
        onPageNumberChange={onPageNumberChange}
        onChangePageSize={onChangePageSize}
        pageSize={pageSize}
        currentPage={currentPage}
        count={data?.data?.count || 1}
      />
    </>
  );
}

export default List;
