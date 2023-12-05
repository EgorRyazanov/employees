import { AxiosRequestConfig } from 'axios';
import { CONFIG } from '../../config';

export function shouldInterceptSecret(config: AxiosRequestConfig): boolean {
  return config.baseURL?.startsWith(CONFIG.apiUrl) ?? false;
}

function getAuthorizationHeaderValue(secret: string): string {
  return `Bearer ${secret}`;
}

export async function addSecretBeforeRequest(
  config: AxiosRequestConfig,
  getSecret: () => Promise<string | null>,
): Promise<AxiosRequestConfig> {
  const secret = await getSecret();

  if (!shouldInterceptSecret(config) || secret == null) {
    return config;
  }

  const { headers } = config;

  if (headers == null) {
    throw new Error('Заголовки не найдены');
  }

  return {
    ...config,
    headers: {
      ...headers,
      Authorization: getAuthorizationHeaderValue(secret),
    },
  };
}
