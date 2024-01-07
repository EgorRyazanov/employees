export interface ObjectWithMetadata<T> {
  readonly items: T;
  readonly page: number;
  readonly total: number;
}
