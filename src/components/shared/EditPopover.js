import * as React from "react";
import { Popover as MuiPopper } from "@mui/material";
import Typography from "@mui/material/Typography";
import MoreHorizTwoToneIcon from "@mui/icons-material/MoreHorizTwoTone";
import { IconButton } from "@mui/material";
import { styled } from "@mui/material";
import { createSearchParams, useNavigate } from "react-router-dom";

const PopoverComponent = styled(MuiPopper)({
  "& .MuiPaper-root": {
    minWidth: "150px",
  },
});
const Titles = styled(Typography)({
  padding: "14px !important",
  cursor: "pointer !important",
  font: "normal normal normal 16px/19px sans-serif !important",
  color: "#000000 !important",
});

export function EditPopover({ inputValues, disable }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  
  const handleNavigate = (id, path, view, search, stateProps) => {
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
          state: { viewDetails: Boolean(view), ...stateProps },
        }
      );
    setAnchorEl(null);
  };
  return (
    <div style={{ display: "flex", justifyContent: "end" }}>
      <IconButton
        aria-describedby={id}
        onClick={handleClick}
        disabled={disable}
      >
        <MoreHorizTwoToneIcon />
      </IconButton>
      {open ? (
        <PopoverComponent
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
        >
          {inputValues?.map(
            (
              {
                id,
                path,
                label,
                toHide,
                customNavigation,
                customComp,
                view,
                search,
                stateProps = {},
              },
              index
            ) =>
              !toHide ? (
                customComp ? (
                  <Titles key={index}>{customComp}</Titles>
                ) : (
                  <Titles
                    key={index}
                    onClick={() =>
                      customNavigation
                        ? customNavigation(id)
                        : handleNavigate(id, path, view, search, stateProps)
                    }
                  >
                    {label}
                  </Titles>
                )
              ) : (
                <></>
              )
          )}
        </PopoverComponent>
      ) : (
        <></>
      )}
    </div>
  );
}
