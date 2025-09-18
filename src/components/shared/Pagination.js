import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useLocation } from "react-router-dom";

const style = {
  position: "fixed",
  bottom: 0,
  width: "100%",
  background: "white",
  alignItems: "center",
  ".MuiPagination-ul": {
    flexWrap: "nowrap",
  },
  padding: "10px 0px",
};

const styles = {
  ".MuiPaginationItem-root": {
    ":hover": {
      backgroundColor: "#EA7002 !important",
    },
  },
};

export default function ListPagination({ count, onPageNumberChange }) {
  const params = new URLSearchParams(useLocation().search);
  const currentPage = params.get("currentPage");

  const handleChange = (event, value) => {
    onPageNumberChange(value);
  };

  const pagination = () => {
    return (
      <Stack spacing={2} sx={{ ...style }}>
        <Pagination
          count={count ? (count > 10 ? Math.ceil(count / 10) : 1) : 0}
          page={parseInt(currentPage) || 1}
          onChange={handleChange}
          color="primary"
          sx={styles}
        />
      </Stack>
    );
  };

  return pagination();
}
