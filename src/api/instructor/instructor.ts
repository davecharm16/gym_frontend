import type { ApiResponse } from "../../types/api_response";
import type { InstructorType } from "../../types/instructor";
import { endPoint } from "../api";
import { apiClient } from "../apiClient";
import { InstructorTypeDTOToModel } from "../commercial/adapter/instructor_adapter";
import type { InstructorTypeDTO } from "../commercial/dto/instructor_dto";

export const getInstructor = async (): Promise<ApiResponse<InstructorType[]>> => {
  try {
    const res = await apiClient.get<InstructorTypeDTO[]>(endPoint.instructor);
    const adaptedData = res.data?.map((data) => InstructorTypeDTOToModel(data)) || [];

    return {
      ...res,
      data: adaptedData,
    };
  } catch (error) {
    console.error("fetch subscription types failed:", error);
    throw error;
  }
};