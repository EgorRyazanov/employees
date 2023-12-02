import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, IconButton, InputAdornment, Stack, Typography, useTheme } from '@mui/material';

import { typedMemo } from '../../../../utils/typedMemo';
import { LoginFormValue, initValues, loginFormSchema } from './LoginForm.settings';
import { TextFieldComponent } from '../../../../components/TextField';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import styles from './LoginForm.module.scss';

export const LoginFormComponent: FC = () => {
  const theme = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, formState } = useForm<LoginFormValue>({
    defaultValues: initValues,
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    resolver: zodResolver(loginFormSchema),
  });

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const onSubmit = () => {
    console.log('text');
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
      <Button sx={{ width: '100%' }} type="submit" variant="contained">
        Войти
      </Button>
      {!!formState.errors.root && (
        <Typography variant="body2" sx={{ textAlign: 'center', color: theme.palette.error.main }}>
          {formState.errors?.root?.message}
        </Typography>
      )}
      <Typography variant="body2" sx={{ textAlign: 'center' }}>
        Если Вы забыли логин или пароль — Обратитесь в Брусника.Помощь
      </Typography>
    </form>
  );
};

export const LoginForm = typedMemo(LoginFormComponent);
