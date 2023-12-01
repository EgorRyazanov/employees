import { FC } from 'react';
import { typedMemo } from '../../../../utils/typedMemo';
import { Container } from '@mui/material';
import { LoginFormComponent } from '../../components/LoginForm/LoginForm';

const LoginPageComponent: FC = () => {
  return (
    <Container maxWidth="xs">
      <LoginFormComponent />
    </Container>
  );
};

export const LoginPage = typedMemo(LoginPageComponent);
