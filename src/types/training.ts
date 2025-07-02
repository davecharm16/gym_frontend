import { Dayjs } from "dayjs";

export interface TrainingModel {
  id: string;
  title: string;
  description: string;
  instructorId: string | null;
  baseFee: number;
  createdAt: Dayjs;
}

export interface EditTrainingModel {
  title: string;
  fee: number;
}
