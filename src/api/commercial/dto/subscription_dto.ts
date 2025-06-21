export interface SubscriptionTypeDTO {
  id: string;
  name: string;
  created_at: string;
  subscription_fees?: {
    amount: number;
  };
}

export interface CreateSubscriptionTypeRequestDTO {
  name: string;
  amount: number;
}


// subscription_response_dto.ts

export interface CreateSubscriptionResponseDTO {
  id: string;
  name: string;
  amount: number;
}

