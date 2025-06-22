import { apiClient } from '../apiClient';
import { endPoint } from '../api';
import type { ApiResponse } from '../../types/api_response';
import type { TrainingDto } from '../commercial/dto/training_dto';
import type { TrainingModel } from '../../types/training';
import { trainingAdapterDTOtoModel } from '../commercial/adapter/training_adapter';

export const getTrainings = async (): Promise<ApiResponse<TrainingModel[]>> => {
  try {
    const res = await apiClient.get<TrainingDto[]>(endPoint.trainings);

    return {
      ...res,
      data: res.data?.map(trainingAdapterDTOtoModel) ?? [],
    };
  } catch (error) {
    console.error('getTrainings failed:', error);
    throw error;
  }
};
