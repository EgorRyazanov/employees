export interface Node {
  readonly id: number;
  readonly name: string;
  readonly next: Node[];
}
