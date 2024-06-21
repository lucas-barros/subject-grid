import express from "express";

import { Container } from "../container";
import { createSubjectController } from "../controllers/subject.controller";
import { createSubjectUseCase } from "../../domain/use-cases/subject.case";

export const router = (container: Container) => {
  const router = express.Router();
  const useCase = createSubjectUseCase(container);
  const subjectController = createSubjectController(useCase);

  router.post("/", subjectController.create);
  router.get("/", subjectController.getAll);
  router.put("/:id", subjectController.put);
  router.delete("/:id", subjectController.delete);

  return router;
};
