import { createAction } from '@reduxjs/toolkit';
import { AppError } from '../../models/appError';
import { User } from '../../models/user';

const name = 'user';

export const actions = {
  success: createAction<User>(`${name}/success`),
  request: createAction(`${name}/request`),
  failure: createAction<AppError>(`${name}/failure`),
};
