import { Subject } from "../../infrastructure/database/model/Subject";
import { Sex, Status } from "../entities/subject.entity";

export interface CreateInput {
  name?: string;
  sex?: Sex;
  diagnosisDate?: Date;
  status?: Status;
}

export interface Output {
  id: number;
  name: string;
  sex: string;
  diagnosisDate: string;
  status: string;
}

export type UpdateInput = CreateInput;

export type FilterInput = CreateInput;

export const output = ({
  id,
  name,
  sex,
  status,
  diagnosisDate,
}: Subject): Output => {
  return {
    id,
    name,
    diagnosisDate: diagnosisDate.toISOString(),
    sex,
    status,
  };
};
