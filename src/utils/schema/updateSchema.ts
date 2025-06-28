import * as yup from 'yup';

export const updateStudentSchema = yup.object({
  first_name: yup.string().optional(),
  last_name: yup.string().optional(),
  middle_name: yup.string().nullable().optional(),
  address: yup.string().optional(),
  birthdate: yup.date().nullable().optional(),
  sex: yup.string().oneOf(['male', 'female', 'other']).optional(),
  subscription_type_id: yup.string().uuid().nullable().optional(),
  picture_url: yup.string().url().nullable().optional(),
  paid_until: yup.date().nullable().optional(),
});

export type UpdateStudentFormSchema = yup.InferType<typeof updateStudentSchema>;
