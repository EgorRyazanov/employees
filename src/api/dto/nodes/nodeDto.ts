import { StructureEnum } from '../../../models/structure';
import { PersonDto } from '../personDto';

export interface NodeDto {
  readonly id: number;
  readonly name: string;
  readonly next: readonly NodeDto[];
  readonly employees: readonly PersonDto[];
  readonly employers: readonly PersonDto[];
  readonly isDisplay: boolean;
  readonly structureEnum: StructureEnum;
  readonly userCount: number;
  readonly vacancyCount: number;
}
