// src/services/profile/adapter/getProfileAdapter.ts

import type { ProfileModel } from "../../../types/profile";
import type { GetProfileResponseDTO } from "../dto/get_profile_dto";



export const getProfileAdapter = (dto: GetProfileResponseDTO): ProfileModel => {
  switch (dto.role) {
    case 'student':
      return {
        id: dto.id,
        firstName: dto.first_name,
        lastName: dto.last_name,
        email: dto.email,
        address: dto.address,
        birthdate: dto.birthdate,
        subscriptionTypeId: dto.subscription_type_id,
        paidUntil: dto.paid_until,
        createdAt: dto.created_at,
        trainings: dto.trainings?.map(t => ({
          id: t.id,
          title: t.title,
          description: t.description,
          baseFee: t.base_fee,
          instructorId: t.instructor_id,
        })) ?? [],
        role: 'student',
      };
    case 'instructor':
      return {
        id: dto.id,
        name: dto.name,
        createdAt: dto.created_at,
        role: 'instructor',
      };
    case 'admin':
      return {
        id: dto.id,
        fullName: dto.full_name,
        superAdmin: dto.super_admin,
        createdAt: dto.created_at,
        role: 'admin',
      };
    default:
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      throw new Error(`Unknown role: ${(dto as any).role}`);
  }
};
