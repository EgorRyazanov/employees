import { Login } from '../../../../models/login';
import { z } from 'zod';

export type LoginFormValue = Login;

export const initValues: LoginFormValue = {
  email: '',
  password: '',
  rememberMe: false,
};

export const loginFormSchema = z.object({
  email: z.string().email('Некорректная почта'),
  password: z.string().min(1, 'Обязательное поле'),
  rememberMe: z.boolean(),
});
