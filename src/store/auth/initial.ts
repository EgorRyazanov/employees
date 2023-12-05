import { STATUS } from '../../api/services/utils/status';
import { AppError } from '../../models/appError';
import { Login } from '../../models/login';

export type LoginState = {
  status: STATUS;
  error?: AppError<Login>;
};

export const initialState: LoginState = {
  status: STATUS.initial,
};
