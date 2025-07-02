import dayjs from 'dayjs';
import type { EditTrainingModel, TrainingModel } from '../../../types/training';
import type {  EditTrainingTypeRequestDTO, TrainingDto } from '../dto/training_dto';

export const trainingAdapterDTOtoModel = (dto: TrainingDto): TrainingModel => ({
  id: dto.id,
  title: dto.title,
  description: dto.description,
  instructorId: dto.instructor_id,
  baseFee: dto.base_fee,
  createdAt: dayjs(dto.created_at),
});

export const trainingAdapterModelToDTO = (model: TrainingModel): TrainingDto => ({
  id: model.id,
  title: model.title,
  description: model.description,
  instructor_id: model.instructorId,
  base_fee: model.baseFee,
  created_at: model.createdAt.toISOString(),
});

export const editTrainingAdapterModelToDTO = (model: EditTrainingModel): EditTrainingTypeRequestDTO => ({

  title: model.title,
  base_fee: model.fee,

});
