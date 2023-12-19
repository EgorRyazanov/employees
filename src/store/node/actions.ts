import { createAction } from '@reduxjs/toolkit';

import { AppError } from '../../models/appError';
import { Node } from '../../models/node';

const name = 'node';

export const actions = {
  success: createAction<Node>(`${name}/success`),
  request: createAction(`${name}/request`),
  failure: createAction<AppError>(`${name}/failure`),
};
