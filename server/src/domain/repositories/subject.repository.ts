import { DataSource, Repository } from "typeorm";
import { Subject } from "../../infrastructure/database/model/Subject";

export type SubjectRepository = Repository<Subject>;

export const createSubjectRepository = (dataSource: DataSource) =>
  dataSource.getRepository(Subject);
