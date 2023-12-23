import { Person } from './person';
import { StructureEnum } from './structure';
export interface Node {
  readonly id: number;
  readonly name: string;
  readonly next: Node[];
  readonly employees: Person[];
  readonly employers: Person[];
  readonly userCount: number;
  readonly vacancyCount: number;
  readonly isDisplay: boolean;
  readonly structureEnum: StructureEnum;
}
