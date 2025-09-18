import * as React from "react";
import { FormLabel, Switch } from "@mui/material";

export function CustomSwitch(props) {
  const { label, onChange, checked, isViewMode } = props;
  return (
    <div style={{ display: "flex", alignItems: "center", marginRight: 2 }}>
      <FormLabel
        htmlFor={props.name}
        sx={{ color: "#00000090", cursor: "pointer" }}
      >
        {label}
      </FormLabel>
      <Switch
        id={props.name}
        checked={checked}
        disabled={isViewMode}
        onChange={onChange}
        inputProps={{ "aria-label": "controlled" }}
        color="primary"
      />
    </div>
  );
}
