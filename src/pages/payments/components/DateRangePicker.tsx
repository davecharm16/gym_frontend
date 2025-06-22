// src/components/common/DateRangePicker.tsx
import React from 'react';
import { Stack } from '@mui/material';
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
              onEndDateChange(newValue); // auto-correct
            }
          }}
          maxDate={enforceBidirectionalConstraint ? endDate ?? undefined : undefined}
          slotProps={{ textField: { fullWidth: true, size: 'medium' } }}
        />

        <DatePicker
          label={labelEnd}
          value={endDate}
          onChange={onEndDateChange}
          minDate={enforceBidirectionalConstraint ? startDate ?? undefined : undefined}
          slotProps={{ textField: { fullWidth: true, size: 'medium' } }}
        />
      </Stack>
    </LocalizationProvider>
  );
};

export default DateRangePicker;
