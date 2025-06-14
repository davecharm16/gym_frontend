import type { SubscriptionType } from "../../../types/subscription";
import type { SubscriptionTypeDTO } from "../dto/subscription_dto";

export const subscriptionTypeDTOToModel = (
  dto: SubscriptionTypeDTO
): SubscriptionType => ({
  id: dto.id,
  name: dto.name,
  createdAt: dto.created_at,
  amount: dto.subscription_fees?.amount ?? null,
});