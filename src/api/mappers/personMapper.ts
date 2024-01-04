import { Person } from '../../models/person';
import { PersonDetails } from '../../models/personDetails';
import { PersonDto } from '../dto/personDto';
import { PersonDetailsDto } from '../dto/personDetailsDto';
import { MapperFromDto } from './mapper';

class PersonMapper implements MapperFromDto<PersonDto, Person> {
  public fromDto(dto: PersonDto): Person {
    return {
      id: dto.id,
      fullName: dto.fullName,
      position: dto.position,
      userPosition: dto.userPosition,
      isVacancy: dto.isVacancy,
    };
  }

  public fromPersonDetailsDto(dto: PersonDetailsDto): PersonDetails {
    return {
      id: dto.id,
      fullName: dto.fullName,
      email: dto.email,
      phoneNumber: dto.phoneNumber,
      position: dto.position,
      isVacancy: dto.isVacancy,
      workType: dto.workType,
      userNumber: dto.userNumber,
      location: dto.location,
      userPosition: dto.userPosition,
      group: dto.group,
      department: dto.department,
      division: dto.division,
      legalEntity: dto.legalEntity,
    };
  }
}

export const personMapper = new PersonMapper();
