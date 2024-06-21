import "dotenv/config";
import joi from "joi";

const envVarsSchema = joi
  .object({
    NODE_ENV: joi
      .string()
      .valid("production", "development", "test")
      .default("development")
      .required(),
    SERVER_PORT: joi.number().default(8080).required(),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema
  .prefs({ errors: { label: "key" } })
  .validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export const config: {
  nodeEnv: "production" | "development" | "test";
  serverPort: number;
} = {
  nodeEnv: envVars.NODE_ENV,
  serverPort: envVars.SERVER_PORT,
};
