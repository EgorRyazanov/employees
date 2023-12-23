import { Division } from '../../../../models/division';
import { StructureEnum } from '../../../../models/structure';

export interface LevelDisplayedOptions {
  division: Division;
  variant: StructureEnum;
  isSelected: boolean;
  isVisible: boolean;
}
