import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { CONFIG } from '../../config';

export type SecretRefreshResult = Promise<AxiosResponse<unknown, unknown>>;

export async function refreshSecret(
  error: AxiosError,
  refreshCallback: () => SecretRefreshResult,
): SecretRefreshResult {
  if (
    error.config == null ||
    !shouldRefreshSecretForUrl(error.config) ||
    (error.response != null && error.response.status !== 401)
  ) {
    throw error;
  }

  const result = await refreshCallback();
  return result;
}

export function shouldRefreshSecretForUrl(config: AxiosRequestConfig): boolean {
  const { url, baseURL } = config;
  if (url == null || baseURL == null) {
    return false;
  }

  const fullUrl = `${baseURL}/${url}`;
  const homeUrl = new URL('', CONFIG.apiUrl).toString();

  const isHomeRequest = fullUrl.startsWith(homeUrl);
  const isAuthRequest = fullUrl.startsWith(new URL('auth', homeUrl).toString());

  return isHomeRequest && !isAuthRequest;
}
