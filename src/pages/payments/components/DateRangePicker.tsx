import React from 'react';
import { Stack, type TextFieldProps } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Dayjs } from 'dayjs';

type DateRangePickerProps = {
  startDate: Dayjs | null;
  endDate: Dayjs | null;
  onStartDateChange: (date: Dayjs | null) => void;
  onEndDateChange: (date: Dayjs | null) => void;
  labelStart?: string;
  labelEnd?: string;
  enforceBidirectionalConstraint?: boolean;
};

const DateRangePicker: React.FC<DateRangePickerProps> = ({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  labelStart = 'Start Date',
  labelEnd = 'End Date',
  enforceBidirectionalConstraint = true,
}) => {
  const commonTextFieldProps: Partial<TextFieldProps> = {
    size: 'small',
    fullWidth: true,
    sx: {
      backgroundColor: '#fff',
      '& .MuiInputBase-input': {
        color: '#000',
        fontSize: 12,
      },
      '& .MuiInputLabel-root': {
        color: '#000',
        fontSize: 12,
      },
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: '#ccc',
        },
        '&:hover fieldset': {
          borderColor: '#999',
        },
        '&.Mui-focused fieldset': {
          borderColor: '#666',
        },
      },
    },
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack direction="row" spacing={2}>
        <DatePicker
          label={labelStart}
          value={startDate}
          onChange={(newValue) => {
            onStartDateChange(newValue);
            if (
              enforceBidirectionalConstraint &&
              newValue &&
              endDate &&
              newValue.isAfter(endDate)
            ) {
              onEndDateChange(newValue);
            }
          }}
          maxDate={enforceBidirectionalConstraint ? endDate ?? undefined : undefined}
          slotProps={{ textField: commonTextFieldProps }}
        />

        <DatePicker
          label={labelEnd}
          value={endDate}
          onChange={onEndDateChange}
          minDate={enforceBidirectionalConstraint ? startDate ?? undefined : undefined}
          slotProps={{ textField: commonTextFieldProps }}
        />
      </Stack>
    </LocalizationProvider>
  );
};

export default DateRangePicker;
