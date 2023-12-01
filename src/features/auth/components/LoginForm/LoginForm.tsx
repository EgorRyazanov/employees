import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, IconButton, InputAdornment, Stack, Typography } from '@mui/material';

import { typedMemo } from '../../../../utils/typedMemo';
import { LoginFormValue, initValues, loginFormSchema } from './LoginForm.settings';
import { TextFieldComponent } from '../../../../components/TextField';
import { Visibility, VisibilityOff } from '@mui/icons-material';

export const LoginFormComponent: FC = () => {
  const { register, handleSubmit, formState } = useForm<LoginFormValue>({
    defaultValues: initValues,
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    resolver: zodResolver(loginFormSchema),
  });

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  const onSubmit = () => {
    console.log(123);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2} width={400}>
        <div className="">
          <Typography>Почта</Typography>
          <TextFieldComponent
            fullWidth
            placeholder="Введите почту"
            error={!!formState.errors.email}
            helperText={formState.errors?.email?.message}
            {...register('email')}
          />
        </div>
        <div>
          <Typography>Пароль</Typography>
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
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}>
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </div>
        <Button type="submit" variant="contained">
          Войти
        </Button>
      </Stack>
    </form>
  );
};

export const LoginForm = typedMemo(LoginFormComponent);
