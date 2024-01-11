import axios, { AxiosError, AxiosInstance } from 'axios';

import { CONFIG } from './config';
import { addSecretBeforeRequest } from './interceptors/addSecretBeforeRequest';
import { UserSecretStorageService } from './services/userSecretStorage';
import { SecretRefreshResult, refreshSecret } from './interceptors/refreshSecret/refreshSecret';
import { AuthApi } from './services/authApi';
import { Store } from '../store';
import { PersonStore } from '../store/person';

export const http: AxiosInstance = axios.create({
  baseURL: CONFIG.apiUrl,
});

export const setupInterceptors = (store: Store) => {
  const getSecret = async (): Promise<string | null> => {
    const secret = await UserSecretStorageService.get();
    return secret?.token ?? null;
  };

  http.interceptors.request.use(config => addSecretBeforeRequest(config, getSecret));

  const handleSecretRefresh = async (error: AxiosError): SecretRefreshResult => {
    const secret = await UserSecretStorageService.get();

    if (error.response?.status === 401) {
      try {
        if (secret == null || error.config == null) {
          await UserSecretStorageService.remove();
          store.dispatch(PersonStore.actions.dropMe());
          throw error;
        }
        const newSecret = await AuthApi.refreshSecret(secret);
        await UserSecretStorageService.save(newSecret);
        store.dispatch(PersonStore.thunks.getMe());
        return http.request(error.config);
      } catch (error: unknown) {
        await UserSecretStorageService.remove();
        store.dispatch(PersonStore.actions.dropMe());
        throw error;
      }
    }

    throw error;
  };

  http.interceptors.response.use(
    config => config,
    error => refreshSecret(error, () => handleSecretRefresh(error)),
  );
};
