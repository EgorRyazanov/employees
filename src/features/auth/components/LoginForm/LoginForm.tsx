import { zodResolver } from '@hookform/resolvers/zod';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Box, Button, IconButton, InputAdornment, Link, Stack, Typography, useTheme } from '@mui/material';
import { FC, useCallback, useEffect, useState } from 'react';
import { useForm, type Path } from 'react-hook-form';

import { typedMemo } from '../../../../utils/typedMemo';
import { LoginFormValue, initValues, loginFormSchema } from './LoginForm.settings';
import { TextFieldComponent } from '../../../../components';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { authSelectors } from '../../../../store/auth/selectors';
import { EntityValidationErrors } from '../../../../models/appError';
import { Login } from '../../../../models/login';
import { LoginStore } from '../../../../store/auth';
import styles from './LoginForm.module.scss';

const LoginFormComponent: FC = () => {
  const errors = useAppSelector(authSelectors.selectAuthErrors);
  const isLoading = useAppSelector(authSelectors.SelectIsAuthLoading);
  const dispatch = useAppDispatch();

  const theme = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, formState, setError } = useForm<LoginFormValue>({
    defaultValues: initValues,
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    resolver: zodResolver(loginFormSchema),
  });

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const setValidationErrors = useCallback(
    (validationErrors: EntityValidationErrors<Login>) => {
      for (const [field, messageOrError] of Object.entries(validationErrors)) {
        if (field === 'non_field_errors') {
          setError('root', { type: 'server', message: messageOrError });
        } else {
          setError(field as Path<Login>, {
            type: 'server',
            message: messageOrError,
          });
        }
      }
    },
    [setError],
  );

  useEffect(() => {
    if (errors != null && errors.validationData != null) {
      setValidationErrors(errors.validationData);
      setError('root', { type: 'server', message: errors.message });
    }
  }, [errors, setValidationErrors, setError]);

  const onSubmit = (values: LoginFormValue) => {
    dispatch(LoginStore.thunks.login(values));
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2}>
        <Box>
          <Typography variant="body2">Почта</Typography>
          <TextFieldComponent
            fullWidth
            placeholder="Введите почту"
            error={!!formState.errors.email}
            helperText={formState.errors?.email?.message}
            {...register('email')}
          />
        </Box>
        <Box>
          <Typography variant="body2">Пароль</Typography>
          <TextFieldComponent
            fullWidth
            placeholder="Введите пароль"
            type={showPassword ? 'text' : 'password'}
            error={!!formState.errors.password}
            helperText={formState.errors?.password?.message}
            {...register('password')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword}>
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>
      </Stack>
      <Button disabled={isLoading} sx={{ width: '100%' }} type="submit" variant="contained">
        Войти
      </Button>
      {!!formState.errors.root && (
        <Typography variant="body2" sx={{ textAlign: 'center', color: theme.palette.error.main }}>
          {formState.errors?.root?.message}
        </Typography>
      )}
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Typography variant="body2" sx={{ textAlign: 'center', width: '50%' }}>
          Если Вы забыли логин или пароль —{' '}
          <Link href="mailto:help@brusnika.ru" variant="body2" sx={{ color: '#005BD1' }}>
            Обратитесь в Брусника.Помощь
          </Link>
        </Typography>
      </Box>
    </form>
  );
};

export const LoginForm = typedMemo(LoginFormComponent);
