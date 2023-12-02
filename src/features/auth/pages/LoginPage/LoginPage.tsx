import { FC } from 'react';
import { Box, Container } from '@mui/material';

import { typedMemo } from '../../../../utils/typedMemo';
import { LoginFormComponent } from '../../components/LoginForm/LoginForm';
import logoLink from '/src/assets/logo.svg';
import styles from './LoginPage.module.scss';

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
        <LoginFormComponent />
      </Box>
    </Container>
  );
};

export const LoginPage = typedMemo(LoginPageComponent);
