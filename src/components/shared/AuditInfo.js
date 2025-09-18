import React from "react";
import { Typography, useMediaQuery, Box, styled } from "@mui/material";
import { auditDetails } from "../../constants/globalConstants";
import { dateFormatOption } from "../../constants/globalConstants";

const Container = styled("div")(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  width: "100%",
  margin: 0,
  marginTop: 16,
  gap: 15,
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
  },
}));
const CustomTitle = styled(Typography)({
  fontSize: 16,
  fontWeight: 600,
  textAlign: "start",
});
const ContentsBox = styled(Box)(({ theme }) => ({
  width: "47.5%",
  textAlign: "start",
  [theme.breakpoints.down("sm")]: {
    width: "100%",
    display: "flex",
    alignItems: "center",
  },
}));

export function AuditInfo({ details }) {
  const isMobile = useMediaQuery("(max-width: 600px)");
  const getValue = (key, value) => {
    if (!value) return "N/A";
    if (value?.name) return value?.name;
    if (key === "createdAt" || key === "updatedAt")
      return new Intl.DateTimeFormat(["ban", "id"], dateFormatOption).format(
        new Date(value)
      );
    return value;
  };
  return (
    <Container>
      <Box style={{ width: "100%" }}>
        <Typography sx={{ fontWeight: 600, fontSize: 20 }}>
          Audit Info
        </Typography>
      </Box>
      {auditDetails.map(({ title, detail }) => (
        <ContentsBox key={title}>
          <CustomTitle>{title}</CustomTitle>
          {isMobile && <Typography sx={{ marginInline: "3px" }}>-</Typography>}
          <Typography>{getValue(detail, details?.[detail])}</Typography>
        </ContentsBox>
      ))}
    </Container>
  );
}
