import { zodResolver } from '@hookform/resolvers/zod';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  Box,
  Button,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Link,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import { FC, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { typedMemo } from '../../../../utils/typedMemo';
import { LoginFormValue, initValues, loginFormSchema } from './LoginForm.settings';
import { CheckBoxComponent, TextFieldComponent } from '../../../../components';
import styles from './LoginForm.module.scss';

const LoginFormComponent: FC = () => {
  const theme = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, formState, control } = useForm<LoginFormValue>({
    defaultValues: initValues,
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    resolver: zodResolver(loginFormSchema),
  });

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const onSubmit = (values: LoginFormValue) => {
    console.log(values);
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
        <FormControlLabel
          control={
            <Controller
              name="rememberMe"
              control={control}
              render={({ field: props }) => (
                <CheckBoxComponent {...props} checked={props.value} onChange={e => props.onChange(e.target.checked)} />
              )}
            />
          }
          label={'Запомнить меня'}
        />
      </Stack>
      <Button sx={{ width: '100%' }} type="submit" variant="contained">
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
