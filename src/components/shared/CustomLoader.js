import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export function CustomLoader() {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "fixed",
        width: "100vw",
        height: "100vh",
        left: "0px",
        top: "0px",
        zIndex: 99,
      }}
    >
      <CircularProgress />
    </Box>
  );
}
