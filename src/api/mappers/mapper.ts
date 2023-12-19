import { EntityValidationErrors } from '../../models/appError';
import { ValidationErrorDto } from '../dto/validationErrorDto';

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface MapperFromDto<Dto, Model> {
  fromDto(dto: Dto): Model;
}

export interface MapperToDto<Dto, Model> {
  toDto(data: Model): Dto;
}

export interface Mapper<Dto, Model> extends MapperFromDto<Dto, Model>, MapperToDto<Dto, Model> {}

export interface ValidationErrorMapper<TDto extends Record<string, any>, TModel extends Record<string, any>> {
  validationErrorFromDto(errorDto?: ValidationErrorDto<TDto> | null): EntityValidationErrors<TModel>;
}
