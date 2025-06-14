import * as yup from "yup";

export const registerStudentSchema = yup.object({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),

  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),

  first_name: yup.string().required("First name is required"),

  last_name: yup.string().required("Last name is required"),

  middle_name: yup.string().nullable(), // Optional

  sex: yup
    .string()
    .required("Sex is required"),

  address: yup.string().required("Address is required"),

  birthdate: yup
    .date()
    .typeError("Birthdate must be a valid date")
    .required("Birthdate is required"),

  enrollment_date: yup
    .date()
    .typeError("Enrollment date must be a valid date")
    .required("Enrollment date is required"),

  subscription_type_id: yup.string().nullable(), // Can be null

  // picture_url: yup
  //   .string()
  //   .url("Must be a valid URL")
  //   .required("Picture URL is required"),
});


export type RegisterStudentFormSchema = yup.InferType<typeof registerStudentSchema>;
