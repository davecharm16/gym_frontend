// src/data/profileData.ts

export interface Profile {
  name: string;
  address: string;
  age: number;
  category: string;
  subscriptionDate: string;
  paymentMethod: string;

}

export const profileRows: Profile[] = [
  {
    name: 'Dela Cruz, Juan',
    address: '123 Main St, Manila',
    age: 28,
    category: 'Boxing',
    subscriptionDate: '2024-05-01',
    paymentMethod: 'Credit Card',

  },
  {
    name: 'Bulaqueñia , Maria',
    address: '123 Main St, Manila',
    age: 34,
    category: 'CrossFit',
    subscriptionDate: '2023-12-10',
    paymentMethod: 'GCash',
   
  },
];
