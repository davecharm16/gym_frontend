import React from 'react';
import {
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  OutlinedInput,
  InputLabel,
  FormControl,
  type SelectChangeEvent,
} from '@mui/material';

type MultiSelectCheckboxProps = {
  label?: string;
  placeholder?: string;
  options: string[];
  value: string[];
  onChange: (value: string[]) => void;
};

const MultiSelectCheckbox: React.FC<MultiSelectCheckboxProps> = ({
  label,
  placeholder = 'Select options',
  options,
  value,
  onChange,
}) => {
  const handleChange = (event: SelectChangeEvent<typeof value>) => {
    const selected = event.target.value as string[];
    onChange(selected);
  };

  return (
    <FormControl fullWidth>
      {label && <InputLabel>{label}</InputLabel>}
      <Select
        multiple
        displayEmpty
        value={value}
        onChange={handleChange}
        input={<OutlinedInput label={label} />}
        renderValue={(selected) =>
          selected.length === 0 ? placeholder : selected.join(', ')
        }
      >
        {options.map((option) => (
          <MenuItem key={option} value={option}>
            <Checkbox checked={value.includes(option)} />
            <ListItemText primary={option} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default MultiSelectCheckbox;
