import joi from "joi";

const envVarsSchema = joi
  .object({
    VITE_SERVER_HOST: joi.string().required(),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema
  .prefs({ errors: { label: "key" } })
  .validate(import.meta.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export const config: {
  serverHost: string;
} = {
  serverHost: envVars.VITE_SERVER_HOST,
};
