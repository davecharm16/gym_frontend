export interface SubscriptionTypeDTO {
  id: string;
  name: string;
  created_at: string;
  subscription_fees?: {
    amount: number;
  };
}
