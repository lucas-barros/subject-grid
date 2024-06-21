import { Request, Response } from "express";
import { z } from "zod";
import { SubjectUseCase } from "../../domain/use-cases/subject.case";
import { SubjectException } from "../../domain/exceptions/subject.exception";
import {
  CreateInput,
  CreateOutput,
  GetAllFilters,
  GetAllOutput,
  PutInput,
  PutOutput,
  toDomainInput,
} from "./dto";

const querySchema = z.object({
  name: z.string().optional(),
  diagnosisDate: z.string().optional(),
  sex: z.string().optional(),
  status: z.string().optional(),
  skip: z.number().optional(),
  take: z.number().optional(),
});

const INTERNAL_ERROR = "Internal server error";

export interface SubjectController {
  create(
    req: Request<unknown, unknown, CreateInput>,
    res: Response<CreateOutput>
  ): Promise<void>;
  put(
    req: Request<{ id: number }, PutInput>,
    res: Response<PutOutput>
  ): Promise<void>;
  getAll(
    req: Request<unknown, unknown, unknown, GetAllFilters>,
    res: Response<GetAllOutput>
  ): Promise<void>;
  delete(req: Request<{ id: number }, PutInput>, res: Response): Promise<void>;
}

export const createSubjectController = (
  useCase: SubjectUseCase
): SubjectController => {
  return {
    create: async (req, res) => {
      const { name, sex, status, diagnosisDate } = req.body;
      const result = await useCase.create(
        toDomainInput({
          diagnosisDate,
          name,
          sex,
          status,
        })
      );

      if (result.isOk()) {
        res.status(201).send(result.value);
        return;
      }
      if (result.error === SubjectException.InvalidData) {
        res.status(400).send({ error: "Invalid form data" });
        return;
      }
      res.status(500).send({ error: INTERNAL_ERROR });
    },
    put: async (req, res) => {
      const subjectId = Number(req.params.id);
      const { name, sex, status, diagnosisDate } = req.body;
      const result = await useCase.update(
        subjectId,
        toDomainInput({
          diagnosisDate,
          name,
          sex,
          status,
        })
      );

      if (result.isOk()) {
        res.status(200).send(result.value);
        return;
      }
      if (result.error === SubjectException.NotFound) {
        res.status(404).send({ error: result.error });
        return;
      }
      if (result.error === SubjectException.InvalidData) {
        res.status(400).send({ error: result.error });
        return;
      }
      res.status(500).send({ error: INTERNAL_ERROR });
    },
    delete: async (req, res) => {
      const subjectId = Number(req.params.id);
      const result = await useCase.delete(subjectId);

      if (result.isOk()) {
        res.status(200).send(result.value);
        return;
      }
      if (result.error === SubjectException.NotFound) {
        res.status(404).send({ error: result.error });
        return;
      }
      if (result.error === SubjectException.InvalidData) {
        res.status(400).send({ error: result.error });
        return;
      }
      res.status(500).send({ error: INTERNAL_ERROR });
    },
    getAll: async (req, res) => {
      const { name, diagnosisDate, sex, status, skip, take } = req.query;
      const isInvalid = !querySchema.safeParse({
        name,
        diagnosisDate,
        sex,
        status,
        skip,
        take,
      }).success;

      if (isInvalid) {
        res.status(400).send({ error: "Invalid query" });
        return;
      }

      const result = await useCase.getAll(
        toDomainInput({ name, sex, status, diagnosisDate }),
        { skip, take }
      );

      if (result.isOk()) {
        res.status(200).send(result.value.map((subject) => subject));
        return;
      }

      res.status(500).send({ error: INTERNAL_ERROR });
    },
  };
};
