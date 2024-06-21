export interface Subject {
  id: number;
  name: string;
  sex: string;
  diagnosisDate: string;
  status: string;
}

export type SubjectForm = Omit<Subject, "id">;
