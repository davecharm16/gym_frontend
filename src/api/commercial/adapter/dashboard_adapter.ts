import type { TotalRegisteredModel } from "../../../types/dashboard";
import type { TotalRegisteredDTO } from "../dto/dashboard_dto";


export const adaptTotalRegistered = (dto: TotalRegisteredDTO): TotalRegisteredModel => ({
  totalRegistered: dto.total_registered,
  filteredBy: dto.filtered_by,
});
