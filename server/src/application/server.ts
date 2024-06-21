import express from "express";
import cors from "cors";
import { DataSource } from "typeorm";
import { router as subjectRouter } from "./routes/subject.route";
import { createContainer } from "./container";

const port = process.env.SERVER_PORT || 8080;

export const createServer = async (dataSource: DataSource) => {
  await dataSource.initialize();
  const app = express();
  const container = createContainer(dataSource);

  app.use(cors());
  app.use(express.json());
  app.use("/subjects", subjectRouter(container));

  return app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
};
