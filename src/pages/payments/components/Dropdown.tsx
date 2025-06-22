import React from "react";
import { TextField, MenuItem,  } from "@mui/material";
import type {TextFieldProps} from '@mui/material';

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
  width = 300,
  height = 50,
  ...rest
}) => {
  return (
    <TextField
      select
      label={label}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      size="medium"
      sx={{
        width,
        height,
        fontSize: "18px",
        "& .MuiInputBase-root": {
          height,
          fontSize: "16px",
        },
        "& .MuiInputLabel-root": {
          fontSize: "16px",
        },
      }}
      {...rest}
    >
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default Dropdown;
