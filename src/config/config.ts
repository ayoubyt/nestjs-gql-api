import * as Joi from 'joi';

export const gqlConf = {
  schemaFilePath: 'src/__generated__/schema.gql',
};

export const auth = {
  accessTokenDuration: '7d',
};

/**
 * the admin that is created with database
 */
export const initAdmin = {
  firstName: 'admin',
  lastName: 'admin',
  role: 'ADMIN',
  email: 'admin@admin.com',
  password: '123456789',
};

export const pagination = {
  defaultPageLimit: 10,
  defaultPAgeOffset: 0,
};

export const env = {
  validationSchema: Joi.object({
    NODE_ENV: Joi.string()
      .valid('development', 'production', 'test', 'provision')
      .default('development'),
    PORT: Joi.number().default(3000),
    MONGO_CONNECTION_STRING : Joi.string().required(),
    ACCESS_TOKEN_SECRET : Joi.string().required()
  }),
};
