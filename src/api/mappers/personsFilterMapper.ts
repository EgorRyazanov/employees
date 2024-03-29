import { PersonsFilter } from '../../models/personsFIlter';
import { removeEmptyValues } from '../../utils/removeEmptyValues';
import { PersonsFilterDto } from '../dto/personsFIlterDto';
import { MapperToDto } from './mapper';

class PersonsFilterMapper implements MapperToDto<PersonsFilterDto, PersonsFilter> {
  public toDto(domain: PersonsFilter): PersonsFilterDto {
    const filterDto: PersonsFilterDto = {
      Page: domain.page,
      PageSize: domain.pageSize,
      LocationName: domain.locationName,
      DivisionName: domain.divisionName,
      DepartmentName: domain.departmentName,
      GroupName: domain.groupName,
      FullName: domain.fullName,
      UserNumber: domain.userNumber,
      UserPosition: domain.userPosition,
      WorkType: domain.workType,
      UserFullName: domain.userFullName,
    };

    return removeEmptyValues(filterDto);
  }
}

export const personsFilterMapper = new PersonsFilterMapper();
