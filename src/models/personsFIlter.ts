import { SortType } from './sortType';

export interface PersonsFilter {
  readonly page: number;
  readonly pageSize: number;
  readonly locationName?: string;
  readonly divisionName?: string;
  readonly departmentName?: string;
  readonly groupName?: string;
  readonly userFullName?: string;
  readonly userPosition?: string;
  readonly workType?: string;
  readonly fullName?: SortType;
  readonly userNumber?: SortType;
}
