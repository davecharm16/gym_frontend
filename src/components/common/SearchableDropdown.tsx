// src/components/common/SearchDropdown.tsx

import React from 'react';
import {
  Autocomplete,
  TextField,
  CircularProgress,
} from '@mui/material';
import { Controller, type Control } from 'react-hook-form';

export type SearchDropdownOption = {
  label: string;
  value: string;
};

type SearchDropdownProps = {
  name: string;
  label: string;
  options: SearchDropdownOption[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
};

const SearchDropdown: React.FC<SearchDropdownProps> = ({
  name,
  label,
  options,
  control,
  loading = false,
  disabled = false,
  fullWidth = true,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        const selectedOption =
          options.find((opt) => opt.value === field.value) || null;

        return (
          <Autocomplete
            options={options}
            getOptionLabel={(option) => option.label}
            value={selectedOption}
            onChange={(_, newValue) => field.onChange(newValue?.value || '')}
            isOptionEqualToValue={(opt, val) => opt.value === val.value}
            loading={loading}
            disabled={disabled}
            fullWidth={fullWidth}
            renderInput={(params) => (
              <TextField
                {...params}
                label={label}
                variant="outlined"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <>
                      {loading && <CircularProgress color="inherit" size={20} />}
                      {params.InputProps.endAdornment}
                    </>
                  ),
                }}
              />
            )}
          />
        );
      }}
    />
  );
};

export default SearchDropdown;
