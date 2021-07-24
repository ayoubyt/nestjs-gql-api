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
