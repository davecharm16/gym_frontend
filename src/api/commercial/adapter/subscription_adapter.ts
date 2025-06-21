import type { CreateSubscriptionType, SubscriptionType } from "../../../types/subscription";
import type { CreateSubscriptionResponseDTO, CreateSubscriptionTypeRequestDTO, SubscriptionTypeDTO } from "../dto/subscription_dto";

export const subscriptionTypeDTOToModel = (
  dto: SubscriptionTypeDTO
): SubscriptionType => ({
  id: dto.id,
  name: dto.name,
  createdAt: dto.created_at,
  amount: dto.subscription_fees?.amount ?? null,
});

export const createSubscriptionModelToDTO = (
  model: CreateSubscriptionType
): CreateSubscriptionTypeRequestDTO => ({
  name:model.name,
  amount:model.fee
});

export const createSubscriptionDTOToModel = (
  dto: CreateSubscriptionResponseDTO
): SubscriptionType => ({
   name:dto.name,
   id:dto.id,
   amount:dto.amount
});