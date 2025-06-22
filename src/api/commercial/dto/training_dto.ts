export interface TrainingDto {
  id: string;
  title: string;
  description: string;
  instructor_id: string | null;
  base_fee: number;
  created_at: string; // ISO string
}