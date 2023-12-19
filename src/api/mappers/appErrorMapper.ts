/* eslint-disable @typescript-eslint/no-explicit-any */
import { type AxiosError } from 'axios';

import { AppError } from '../../models/appError';
import { ApiErrorDto } from '../dto/validationErrorDto';
import { ValidationErrorMapper } from './mapper';

export type ErrorMapper<TDto extends Record<string, unknown>, TEntity extends Record<string, unknown>> =
  | ValidationErrorMapper<TDto, TEntity>
  | ValidationErrorMapper<TDto, TEntity>['validationErrorFromDto'];

export class AppErrorMapper {
  public static fromDto(httpError: AxiosError): AppError {
    const { message } = httpError;
    return new AppError(message);
  }

  public static fromDtoWithValidationSupport<
    TErrorDto extends Record<string, any>,
    TEntity extends Record<string, any>,
  >(httpError: AxiosError<ApiErrorDto<TErrorDto>>, mapper: ErrorMapper<TErrorDto, TEntity>): AppError<TEntity> {
    if (httpError.response?.status !== 400) {
      return this.fromDto(httpError);
    }

    if (typeof mapper !== 'function' && mapper.validationErrorFromDto == null) {
      throw new Error('Provided mapper does not have implementation of validationErrorFromDto');
    }

    const { errors: error, title } = httpError.response.data;

    if (error == null) {
      return this.fromDto(httpError);
    }

    const validationData = typeof mapper === 'function' ? mapper(error) : mapper.validationErrorFromDto(error);

    return new AppError<TEntity>(title ?? '', validationData);
  }
}
