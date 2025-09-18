import { Tooltip, Typography, styled } from "@mui/material";
import { tooltipClasses } from "@mui/material/Tooltip";

export const StyledTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.common.black,
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.black,
  },
}));
export const FormTitles = styled(Typography)({
  fontSize: 15,
  fontWeight: 500,
  textTransform: "uppercase",
});
