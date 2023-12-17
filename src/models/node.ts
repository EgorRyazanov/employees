import { Person } from './person';
export interface Node {
  readonly id: number;
  readonly name: string;
  readonly next: Node[];
  readonly employees: readonly Person[];
  readonly employers: readonly Person[];
  readonly userCount: number;
  readonly vacancyCount: number;
}
