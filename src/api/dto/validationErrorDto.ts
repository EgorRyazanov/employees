/* eslint-disable @typescript-eslint/no-explicit-any */

export type ValidationErrorDto<T extends Record<string, any>> = {
  [P in keyof T]?: T[P] extends readonly (infer K extends Record<string, unknown>)[]
    ? ValidationErrorDto<K>[]
    : T[P] extends Record<string, unknown>
    ? ValidationErrorDto<T[P]>
    : string[];
} & {
  readonly non_field_errors?: string[];
};

export interface ApiErrorDto<TDto extends Record<string, any>> {
  readonly errors?: ValidationErrorDto<TDto>;

  readonly detail?: string;
}
