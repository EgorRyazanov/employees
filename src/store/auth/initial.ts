import { STATUS } from '../../api/services/utils/status';
import { AppError } from '../../models/appError';
import { Login } from '../../models/login';
import { User } from '../../models/user';

export type LoginState = {
  user: User | null;
  status: STATUS;
  error?: AppError<Login>;
};

export const initialState: LoginState = {
  user: null,
  status: STATUS.initial,
};
