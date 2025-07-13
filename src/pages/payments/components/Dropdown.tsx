import React from "react";
import { TextField, MenuItem } from "@mui/material";
import type { TextFieldProps } from "@mui/material";

export type DropdownOption = {
  label: string;
  value: string;
};

type DropdownProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: DropdownOption[];
  width?: number | string;
  height?: number | string;
} & Omit<TextFieldProps, "select" | "onChange" | "value">;

const Dropdown: React.FC<DropdownProps> = ({
  label,
  value,
  onChange,
  options,
  width = "100%",
  height = 40,
  ...rest
}) => {
  return (
    <TextField
      select
      label={label}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      size="small"
      sx={{
        width,
        backgroundColor: "#fff",
        "& .MuiInputBase-root": {
          height,
          fontSize: "12px",
          color: "#000",
        },
        "& .MuiInputLabel-root": {
          fontSize: "12px",
          color: "#000",
        },
        "& .MuiOutlinedInput-root": {
          "& fieldset": {
            borderColor: "#ccc",
          },
          "&:hover fieldset": {
            borderColor: "#999",
          },
          "&.Mui-focused fieldset": {
            borderColor: "#666",
          },
        },
      }}
      {...rest}
    >
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value} sx={{ fontSize: 12 }}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default Dropdown;
