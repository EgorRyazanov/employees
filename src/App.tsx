import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import { LoginPage } from './features/auth/pages/LoginPage';
import '/src/theme/index.scss';

export const App: FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
};
