export interface TrainingDto {
  id: string;
  title: string;
  description: string;
  instructor_id: string | null;
  base_fee: number;
  created_at?: string; 
}

export interface EditTrainingTypeRequestDTO {
  title: string;
  base_fee: number;
}

// subscription_response_dto.ts

export interface EditTrainingResponseDTO {
  id: string;
  name: string;
  amount: number;
}
