export interface Student {
  id: string;
  user_id: string;
  email: string;
  first_name: string;
  last_name: string;
  middle_name: string;
  sex: string;
  address: string;
  birthdate: string;
  enrollment_date: string;
  subscription_type_id: string | null;
  picture_url: string;
  created_at: string;
  subscription_type_name: string | null;
  subscription_fee: number | null;
}
