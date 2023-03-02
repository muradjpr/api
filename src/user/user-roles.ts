import { RolesBuilder } from 'nest-access-control';

export enum UserRoles {
  admin = 'Admin',
  teacher = 'Teacher',
}

export const roles: RolesBuilder = new RolesBuilder();

roles
  .grant(UserRoles.teacher)
  .readAny(['results', 'students'])
  .grant(UserRoles.admin)
  .extend(UserRoles.teacher)
  .createAny(['results', 'students'])
  .updateAny(['results', 'students'])
  .deleteAny(['results', 'students']);
