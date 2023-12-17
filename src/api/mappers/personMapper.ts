import { Person } from '../../models/person';
import { PersonDto } from '../dto/personDto';
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
}

export const personMapper = new PersonMapper();
