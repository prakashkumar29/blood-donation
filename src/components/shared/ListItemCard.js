import React from "react";
import {
  Typography,
  Card as MuiCard,
  styled,
  Box,
  IconButton,
  Paper,
  Button,
} from "@mui/material";
import { useNavigate, createSearchParams } from "react-router-dom";
import { getObjectByAccessor } from "../../utils/common";

const CardContainer = styled(MuiCard)({
  position: "relative",
  width: "90%",
  margin: "5%",
  padding: "5%",
  borderRadius: "1%",
  border: "1px solid",
});
const Card = styled("div")({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  gap: 12,
  fontSize: 17,
  fontWeight: 300,
});
export const CardTitles = styled(Typography)({
  color: "#010d12",
  whiteSpace: "nowrap",
  fontWeight: 500,
});
const SubMenuLayout = styled(Box)({
  display: "flex",
});
export const CallButton = styled(Button)(({ regularPosition = false }) => ({
  width: 50,
  backgroundColor: "#2e7d32",
  color: "#fff",
  position: regularPosition ? "relative" : "absolute",
  right: 12,
  top: 20,
  "&:hover": {
    backgroundColor: "#2e7d32",
    color: "#fff",
  },
  "&.anchor": {
    color: "blue",
    textDecoration: "none",
  },
}));
const MenuButtonContainer = styled(Box)(({ top }) => ({
  display: "flex",
  alignItems: "center",
  gap: 16,
  justifyContent: top ? "flex-end" : "space-between",
  flexWrap: top ? "no-wrap" : "wrap",
  marginLeft: top ? "auto" : 0,
}));

export const CardDetails = styled(Box)(({ withIcon }) => ({
  fontWeight: 600,
  fontSize: "13.5px",
  color: "#918c8c",
  textOverflow: "ellipsis",
  overflow: "hidden",
  fontFamily: "'Roboto', sans-serif",
  whiteSpace: "nowrap",
  display: "flex",
  alignItems: "center",
  flexWrap: withIcon ? "wrap-reverse" : "wrap",
}));

function ListItemCard({
  data,
  columnData,
  topMenuDetails,
  bottomMenuDetails,
  subMenuDetails,
  index,
}) {
  const navigate = useNavigate();
  const handleNavigate = (
    id,
    path,
    view,
    search,
    stateProps,
    navigateState
  ) => {
    if (path)
      navigate(
        {
          pathname: path,
          search: `?${createSearchParams({
            editId: id,
            ...search,
          })}`,
        },
        {
          state: {
            viewDetails: Boolean(view),
            ...navigateState,
            ...getObjectByAccessor(stateProps, data),
          },
        }
      );
  };
  //checks if the menu needs to hide
  const isHides = (hide, checkHide) =>
    !!hide || (!!checkHide ? checkHide(data) : false);

  const MenuButtons = ({ list, top }) => {
    return (
      <MenuButtonContainer top={top}>
        {list?.map(
          (
            {
              accessor,
              path,
              label = "",
              toHide,
              checkHide,
              customNavigation,
              customComp,
              view,
              search,
              stateProps = {},
              Icon,
              navigateState = {},
              action,
              getLabel,
              hasCall,
              inititialValueKeys,
            },
            index
          ) => {
            if (isHides(toHide, checkHide)) return <></>;
            if (customComp)
              //for custom component
              return (
                <customComp.Component
                  key={index}
                  {...customComp} //all props want to be passed
                  {...getObjectByAccessor(customComp?.initialKeys, data)} //gets props by keys from card data
                  initialValues={getObjectByAccessor(inititialValueKeys, data)}
                />
              );
            return (
              // for label & icons
              <Box
                style={{ cursor: "pointer", width: Icon ? "auto" : "45%" }}
                key={index}
                onClick={() =>
                  customNavigation
                    ? customNavigation(data?.[accessor])
                    : handleNavigate(
                        data?.[accessor],
                        path,
                        view,
                        search,
                        stateProps,
                        navigateState
                      )
                }
              >
                {Icon ? (
                  hasCall ? (
                    <a href={`tel:${data?.mobileNo}`}>
                      <IconButton
                        onClick={() => {
                          !!action && action(data);
                        }}
                        sx={{ padding: 0 }}
                      >
                        <Icon />
                      </IconButton>
                    </a> //icon
                  ) : (
                    <IconButton
                      onClick={() => {
                        !!action && action(data);
                      }}
                      sx={{ padding: 0 }}
                    >
                      <Icon />
                    </IconButton>
                  )
                ) : (
                  <Typography //label
                    component={Paper}
                    sx={{ padding: "5px", fontSize: 12 }}
                    onClick={() => {
                      !!action && action(data);
                    }}
                  >
                    {getLabel ? getLabel(data) : label}
                  </Typography> //getLabel for getting label according to data
                )}
              </Box>
            );
          }
        )}
      </MenuButtonContainer>
    );
  };
  return (
    <CardContainer>
      <Card style={{ display: "felx" }}>
        {data &&
          columnData &&
          columnData.length &&
          columnData.map(
            (column, index) =>
              column["accessor"] && (
                <CardDetails
                  key={`${column["accessor"]}${index}`}
                  withIcon={index === 0}
                >
                  <CardTitles>{column["Header"]}</CardTitles>
                  <Typography sx={{ marginInline: "5px" }}>-</Typography>
                  {column?.getDetail
                    ? column?.getDetail(data) //custom detail
                    : data[column["accessor"]]}
                  {topMenuDetails && topMenuDetails?.length && index === 0 ? (
                    <MenuButtons list={topMenuDetails} top />
                  ) : (
                    <></>
                  )}
                </CardDetails>
              )
          )}
        {bottomMenuDetails && bottomMenuDetails?.length ? (
          <MenuButtons list={bottomMenuDetails} />
        ) : (
          <></>
        )}
        {subMenuDetails && (
          <SubMenuLayout>
            {subMenuDetails.map(({ Icon, isEditing, label, action }) => (
              <IconButton
                disabled={isEditing}
                key={label}
                onClick={() => {
                  action && action(index);
                }}
              >
                {Icon ? <Icon /> : <Typography>{label}</Typography>}
              </IconButton>
            ))}
          </SubMenuLayout>
        )}
      </Card>
    </CardContainer>
  );
}

export default ListItemCard;
