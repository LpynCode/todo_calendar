import { UserModel } from '@prisma/client';

export type IDisplayUser = Omit<UserModel, 'password'>;
