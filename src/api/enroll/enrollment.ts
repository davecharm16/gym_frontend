import { endPoint } from "../api";
import { apiClient } from "../apiClient";
import type { EnrollRequestDTO, EnrollResponseDTO } from "../commercial/dto/enrollment_dto";


export const enrollStudent = async (payload: EnrollRequestDTO): Promise<EnrollResponseDTO> => {
  try {
    const res = await apiClient.post<EnrollResponseDTO, EnrollRequestDTO>(endPoint.enroll, payload);
    console.log(res.data);
    return res.data!;
  } catch (error) {
    console.error("Enrollment failed:", error);
    throw error;
  }
};