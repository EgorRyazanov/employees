import { GeneralApiError } from '../api/dto/apiErrorDto';
import { ApiErrorDto } from '../api/dto/validationErrorDto';

export function isApiError<TDto extends Record<string, unknown>>(
  error: unknown,
): error is GeneralApiError<ApiErrorDto<TDto>> {
  return (error as GeneralApiError<ApiErrorDto<TDto>>).isAxiosError === true;
}
