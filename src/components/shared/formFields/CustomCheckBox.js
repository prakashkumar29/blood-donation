import * as React from "react";
import { Checkbox, FormLabel } from "@mui/material";

export function CustomCheckBox(props) {
  const { label, onChange, checked, isViewMode } = props;
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <Checkbox
        id={props.name}
        sx={{ padding: 0, margin: 0, marginRight: 1 }}
        checked={checked}
        disabled={isViewMode || props?.disabled}
        onChange={onChange}
        inputProps={{ "aria-label": "controlled" }}
        color="primary"
      />
      <FormLabel
        htmlFor={props.name}
        sx={{ color: "#00000090", cursor: "pointer" }}
      >
        {label}
      </FormLabel>
    </div>
  );
}
