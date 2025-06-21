import type { InstructorType } from "../../../types/instructor";
import type { InstructorTypeDTO } from "../dto/instructor_dto";

export const InstructorTypeDTOToModel = (
  dto: InstructorTypeDTO
): InstructorType => ({
  id: dto.id,
  name: dto.name,
  createdAt: dto.created_at,
});