import { Person } from './person';
export interface Node {
  readonly id: number;
  readonly name: string;
  readonly next: Node[];
  readonly employees: Person[];
  readonly employers: Person[];
  readonly userCount: number;
  readonly vacancyCount: number;
}
