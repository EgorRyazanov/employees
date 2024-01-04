import { ObjectWithMetadata } from '../../models/objectWithMetadata';
import { PersonDetails } from '../../models/personDetails';
import { ObjectWithMetadataDto } from '../dto/objectWithMetadataDto';
import { PersonDetailsDto } from '../dto/personDetailsDto';
import { http } from '../http';
import { personMapper } from '../mappers/personMapper';

export namespace PersonApi {
  const authUrl = 'api/auth/';
  const personDetailsUrl = 'api/structure/getUserById';
  const personsUrl = 'api/structure/getEmployeesFormTable';

  export async function getMe(): Promise<PersonDetails> {
    const { data } = await http.get<PersonDetailsDto>(authUrl);
    const person = personMapper.fromPersonDetailsDto(data);

    return person;
  }

  export async function getPersonDetails(userId: PersonDetails['id']): Promise<PersonDetails> {
    const { data } = await http.get<PersonDetailsDto>(personDetailsUrl, { params: { UserId: userId } });
    const person = personMapper.fromPersonDetailsDto(data);

    return person;
  }

  export async function getPersons(): Promise<ObjectWithMetadata<readonly PersonDetails[]>> {
    const { data } = await http.get<ObjectWithMetadataDto<readonly PersonDetailsDto[]>>(personsUrl);
    const persons = personMapper.fromPersonWithMetadata(data);

    return persons;
  }
}
