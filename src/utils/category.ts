// src/utils/category.ts

import type { ChipPropsColorOverrides } from '@mui/material';
import type { OverridableStringUnion } from '@mui/types';

export const Category = (
  category: string
): OverridableStringUnion<
  'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning',
  ChipPropsColorOverrides
> => {
  switch (category.toLowerCase()) {
    case 'weight training':
      return 'primary';
    case 'boxing':
      return 'secondary';
    case 'crossfit':
      return 'warning';
    default:
      return 'default';
  }
};
