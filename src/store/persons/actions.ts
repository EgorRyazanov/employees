import { createAction } from '@reduxjs/toolkit';

import { AppError } from '../../models/appError';
import { ObjectWithMetadata } from '../../models/objectWithMetadata';
import { PersonDetails } from '../../models/personDetails';

const name = 'persons';

export const actions = {
  success: createAction<ObjectWithMetadata<PersonDetails[]>>(`${name}/success`),
  request: createAction(`${name}/request`),
  failure: createAction<AppError>(`${name}/failure`),
};
