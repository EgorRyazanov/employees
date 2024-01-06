import { SortType } from './sortType';

export interface PersonsFilter {
  readonly page: number;
  readonly pageSize: number;
  readonly locationName?: string;
  readonly divisionName?: string;
  readonly departmentName?: string;
  readonly groupName?: string;
  readonly fullName?: SortType;
  readonly userNumber?: SortType;
  readonly userPosition?: SortType;
  readonly workType?: SortType;
}
