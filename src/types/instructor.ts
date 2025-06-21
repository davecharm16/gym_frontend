export interface InstructorType {
  id?: string;
  name: string;
  createdAt?: string;
}

export interface CreateInstructorType {
  name: string;
  fee: number;
}
