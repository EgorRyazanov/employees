export interface ObjectWithMetadataDto<T> {
  readonly items: T;
  readonly page: number;
  readonly total: number;
}
