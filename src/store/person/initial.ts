import { STATUS } from '../../api/services/utils/status';
import { AppError } from '../../models/appError';
import { Login } from '../../models/login';
import { Node } from '../../models/node';
import { PersonDetails } from '../../models/personDetails';

export type UserState = {
  me: PersonDetails | null;
  personDetails: PersonDetails | null;
  personNode: Node | null;
  statusMe: STATUS;
  statusPersonDetails: STATUS;
  statusPersonNode: STATUS;
  errorMe?: AppError;
  errorPersonDetails?: AppError<Login>;
  errorPersonNode?: AppError;
};

export const initialState: UserState = {
  statusMe: STATUS.initial,
  statusPersonDetails: STATUS.initial,
  statusPersonNode: STATUS.initial,
  me: null,
  personDetails: null,
  personNode: null,
};
