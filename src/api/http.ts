import axios, { AxiosError, AxiosInstance } from 'axios';
import { CONFIG } from './config';
import { addSecretBeforeRequest } from './interceptors/addSecretBeforeRequest';
import { UserSecretStorageService } from './services/userSecretStorage';
import { SecretRefreshResult, refreshSecret } from './interceptors/refreshSecret/refreshSecret';
import { AuthApi } from './services/authApi';

export const http: AxiosInstance = axios.create({
  baseURL: CONFIG.apiUrl,
});

const getSecret = async (): Promise<string | null> => {
  const secret = await UserSecretStorageService.get();
  return secret?.token ?? null;
};

http.interceptors.request.use(config => addSecretBeforeRequest(config, getSecret));

const handleSecretRefresh = async (error: AxiosError): SecretRefreshResult => {
  const secret = await UserSecretStorageService.get();

  if (secret == null || error.config == null) {
    throw error;
  }

  try {
    const newSecret = await AuthApi.refreshSecret(secret);
    await UserSecretStorageService.save(newSecret);
    return http.request(error.config);
  } catch (error: unknown) {
    await UserSecretStorageService.remove();
    throw error;
  }
};

http.interceptors.response.use(
  config => config,
  error => refreshSecret(error, () => handleSecretRefresh(error)),
);
