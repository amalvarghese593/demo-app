import * as Joi from '@hapi/joi';

const validationSchema = Joi.object({
  PORT: Joi.number().port().required(),
  MONGODB_URI: Joi.string().required(),
  MONGODB_NAME: Joi.string().required(),
  JWT_SECRET: Joi.string().required(),
  JWT_EXPIRES: Joi.string().required(),
});

export const validateConfig = (config: Record<string, unknown>) => {
  const { error, value: validatedConfig } = validationSchema.validate(config, {
    allowUnknown: true,
    abortEarly: false,
  });

  if (error) {
    console.error(
      `Error: env variables validation failed: ${error.message}, time ${new Date().toLocaleString()}`,
      error,
    );
    error.details?.forEach((detail) =>
      console.error(
        `Error: env variable ${detail?.path?.[0]} validation failed: ${detail?.message}, time ${new Date().toLocaleString()}`,
      ),
    );
    process.exit(1);
  }

  return validatedConfig;
};
