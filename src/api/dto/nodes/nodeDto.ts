export interface NodeDto {
  readonly $id: number;
  readonly Name: string;
  readonly Next: NodeDto[];
}
