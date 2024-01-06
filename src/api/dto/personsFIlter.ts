import { SortType } from '../../models/sortType';

export interface PersonsFilterDto {
  readonly Page: number;
  readonly PageSize: number;
  readonly LocationName?: string;
  readonly DivisionName?: string;
  readonly DepartmentName?: string;
  readonly GroupName?: string;
  readonly FullName?: SortType;
  readonly UserNumber?: SortType;
  readonly UserPosition?: SortType;
  readonly WorkType?: SortType;
}
