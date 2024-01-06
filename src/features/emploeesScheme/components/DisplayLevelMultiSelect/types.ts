import { Division } from '../../../../models/division';
import { Structure } from '../../../../models/structure';

export interface LevelDisplayedOptions {
  division: Division;
  variant: Structure;
  isSelected: boolean;
  isVisible: boolean;
}
