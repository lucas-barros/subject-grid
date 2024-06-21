import { Err, Ok, Result } from "ts-results-es";
import { SubjectException } from "../exceptions/subject.exception";
import { Container } from "../../application/container";
import { CreateInput, FilterInput, Output, output, UpdateInput } from "./dto";
import { Between, FindOneOptions, ILike } from "typeorm";
import { startOfDay, endOfDay } from "date-fns";
import { Subject } from "../../infrastructure/database/model/Subject";

interface Pagination {
  skip?: number;
  take?: number;
}

export interface SubjectUseCase {
  create: (payload: CreateInput) => Promise<Result<Output, SubjectException>>;
  update: (
    id: number,
    payload: UpdateInput
  ) => Promise<Result<Output, SubjectException>>;
  delete: (id: number) => Promise<Result<void, SubjectException>>;
  getAll: (
    filter: FilterInput,
    pagination: Pagination
  ) => Promise<Result<Output[], SubjectException>>;
}

export const createSubjectUseCase = ({
  subjectRepository,
}: Container): SubjectUseCase => {
  return {
    create: async ({ name, diagnosisDate, sex, status }) => {
      if (!name || !diagnosisDate || !sex || !status) {
        return Err(SubjectException.InvalidData);
      }

      const result = await subjectRepository.save({
        name,
        diagnosisDate,
        sex,
        status,
      });

      return new Ok(output(result));
    },
    update: async (id, { name, diagnosisDate, sex, status }) => {
      if (!name || !diagnosisDate || !sex || !status) {
        return Err(SubjectException.InvalidData);
      }

      const result = await subjectRepository.save({
        id,
        name,
        diagnosisDate,
        sex,
        status,
      });

      return new Ok(output(result));
    },
    delete: async (id) => {
      if (typeof id !== "number") {
        return Err(SubjectException.InvalidData);
      }

      await subjectRepository.delete(id);

      return Ok(void 0);
    },
    getAll: async (filter, pagination) => {
      const filters: FindOneOptions<Subject>["where"] = {};
      if (filter.name) {
        filters.name = ILike(`%${filter.name}%`);
      }
      if (filter.sex) {
        filters.sex = filter.sex;
      }
      if (filter.status) {
        filters.status = filter.status;
      }
      if (filter.diagnosisDate) {
        filters.diagnosisDate = Between(
          startOfDay(filter.diagnosisDate),
          endOfDay(filter.diagnosisDate)
        );
      }

      const subjects = await subjectRepository.find({
        where: filters,
        skip: pagination.skip || 0,
        take: pagination.take || 10,
      });

      return Ok(subjects.map((subject) => output(subject)));
    },
  };
};
