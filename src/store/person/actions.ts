import { createAction } from '@reduxjs/toolkit';
import { AppError } from '../../models/appError';
import { PersonDetails } from '../../models/personDetails';

const name = 'user';

export const actions = {
  successGettingMe: createAction<PersonDetails>(`${name}/success`),
  requestGettingMe: createAction(`${name}/request`),
  failureGettingMe: createAction<AppError>(`${name}/failure`),
  successGettingPersonDetails: createAction<PersonDetails>(`${name}/details/success`),
  requestGettingPersonDetails: createAction(`${name}/details/request`),
  failureGettingPersonDetails: createAction<AppError>(`${name}/details/failure`),
  dropPersonDetails: createAction(`${name}/details/drop`),
};
