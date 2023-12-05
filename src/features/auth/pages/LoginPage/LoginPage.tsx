import { Box, Container } from '@mui/material';
import { FC } from 'react';

import { typedMemo } from '../../../../utils/typedMemo';
import { LoginForm } from '../../components/LoginForm';
import styles from './LoginPage.module.scss';
import logoLink from '/src/assets/logo.svg';

const LoginPageComponent: FC = () => {
  return (
    <Container
      sx={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '4px',
      }}>
      <Box className={styles.loginContainer}>
        <img className={styles.loginLogo} src={logoLink} alt="Logo" />
        <LoginForm />
      </Box>
    </Container>
  );
};

export const LoginPage = typedMemo(LoginPageComponent);
