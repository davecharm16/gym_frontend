export interface Student {
  id: string;
  email: string;
  first_name: string;
  middle_name: string | null;
  last_name: string;
  address: string;
  birthdate: string;
  created_at: string;
  subscription_type_id: string;
  paid_until: string | null;

  subscription_type: {
    name: string;
  };

  enrollments: {
    training: {
      id: string;
      title: string;
      description: string;
    };
  }[];
}


export interface StudentCheckIn {
  email: string;
  date: Date;
  time: Date;
}
