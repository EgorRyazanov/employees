import { createAction } from '@reduxjs/toolkit';

import { AppError } from '../../models/appError';
import { PersonDetails } from '../../models/personDetails';
import { Node } from '../../models/node';

const name = 'user';

export const actions = {
  successGettingMe: createAction<PersonDetails>(`${name}/success`),
  requestGettingMe: createAction(`${name}/request`),
  failureGettingMe: createAction<AppError>(`${name}/failure`),
  successGettingPersonDetails: createAction<PersonDetails>(`${name}/details/success`),
  requestGettingPersonDetails: createAction(`${name}/details/request`),
  failureGettingPersonDetails: createAction<AppError>(`${name}/details/failure`),
  dropPersonDetails: createAction(`${name}/details/drop`),
  successGettingPersonNode: createAction<Node>(`${name}/personNode/success`),
  requestGettingPersonNode: createAction(`${name}/personNode/request`),
  failureGettingPersonNode: createAction<AppError>(`${name}/personNode/failure`),
};
