import { createAction } from '@reduxjs/toolkit';

import { AppError } from '../../models/appError';
import { Login } from '../../models/login';

const name = 'login';

export const actions = {
  success: createAction(`${name}/success`),
  request: createAction(`${name}/request`),
  failure: createAction<AppError<Login>>(`${name}/failure`),
};
