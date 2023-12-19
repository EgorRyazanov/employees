import { STATUS } from '../../api/services/utils/status';
import { AppError } from '../../models/appError';
import { Login } from '../../models/login';
import { PersonDetails } from '../../models/personDetails';

export type UserState = {
  me: PersonDetails | null;
  personDetails: PersonDetails | null;
  statusMe: STATUS;
  statusPersonDetails: STATUS;
  errorMe?: AppError;
  errorPersonDetails?: AppError<Login>;
};

export const initialState: UserState = {
  statusMe: STATUS.initial,
  statusPersonDetails: STATUS.initial,
  me: null,
  personDetails: null,
};
