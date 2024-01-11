import { SortType } from '../../models/sortType';

export interface PersonsFilterDto {
  readonly Page: number;
  readonly PageSize: number;
  readonly LocationName?: string;
  readonly DivisionName?: string;
  readonly DepartmentName?: string;
  readonly GroupName?: string;
  readonly UserFullName?: string;
  readonly WorkType?: string;
  readonly UserPosition?: string;
  readonly FullName?: SortType;
  readonly UserNumber?: SortType;
}
