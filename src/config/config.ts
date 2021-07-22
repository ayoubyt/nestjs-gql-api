import { join } from 'path';
import { CreateUserInput } from 'src/entity-modules/users/dto/user.inputs';
import { User, UserRole } from 'src/entity-modules/users/entities/user.entity';

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
  role: UserRole.ADMIN,
  email: 'admin@admin.com',
  password: '123456789',
};
