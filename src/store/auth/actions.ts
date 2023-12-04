import { createAction } from '@reduxjs/toolkit';
import { AppError } from '../../models/appError';
import { Login } from '../../models/login';
import { User } from '../../models/user';

const name = 'login';

export const actions = {
  success: createAction<User>(`${name}/success`),
  request: createAction(`${name}/request`),
  failure: createAction<AppError<Login>>(`${name}/failure`),
};
