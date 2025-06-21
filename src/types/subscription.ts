export interface SubscriptionType {
  id: string;
  name: string;
  createdAt?: string;
  amount: number | null;
}

export interface CreateSubscriptionType {

  name: string;
  fee: number;
}
