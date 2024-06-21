import { Sex, Status } from "../../domain/entities/subject.entity";
import { CreateInput as DomainInput } from "../../domain/use-cases/dto";

export interface Error {
  error: string;
}

export interface GetAllFilters {
  name?: string;
  status?: string;
  sex?: string;
  diagnosisDate?: string;
  skip?: number;
  take?: number;
}

export interface CreateInput {
  name?: string;
  sex?: string;
  diagnosisDate?: string;
  status?: string;
}

export type CreateOutput =
  | (CreateInput & {
      id: number;
    })
  | Error;

export type PutInput = CreateOutput;
export type PutOutput = CreateOutput;

export type GetAllOutput =
  | (CreateInput & {
      id: number;
    })[]
  | Error;

export const toDomainInput = ({
  name,
  sex,
  status,
  diagnosisDate,
}: CreateInput): DomainInput => {
  return {
    name,
    diagnosisDate: diagnosisDate ? new Date(diagnosisDate) : undefined,
    sex: Sex[sex as keyof typeof Sex],
    status: Status[status as keyof typeof Status],
  };
};
