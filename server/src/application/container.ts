import { DataSource } from "typeorm";
import {
  createSubjectRepository,
  SubjectRepository,
} from "../domain/repositories/subject.repository";

export interface Container {
  subjectRepository: SubjectRepository;
}

export const createContainer = (dataSource: DataSource): Container => {
  return {
    subjectRepository: createSubjectRepository(dataSource),
  };
};
