import { PersonDto } from '../personDto';

export interface NodeDto {
  readonly id: number;
  readonly name: string;
  readonly next: readonly NodeDto[];
  readonly employees: readonly PersonDto[];
  readonly employers: readonly PersonDto[];
  readonly userCount: number;
  readonly vacancyCount: number;
}
