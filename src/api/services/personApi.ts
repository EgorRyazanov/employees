import { PersonDetails } from '../../models/personDetails';
import { PersonDetailsDto } from '../dto/personDetailsDto';
import { http } from '../http';
import { personMapper } from '../mappers/personMapper';

export namespace PersonApi {
  const authUrl = 'api/auth/';
  const personDetailsUrl = 'api/structure/getUserById';

  export async function getMe(): Promise<PersonDetails> {
    const { data } = await http.get<PersonDetailsDto>(authUrl);
    const person = personMapper.fromPersonDetailsDto(data);

    return person;
  }

  export async function getUserDetails(userId: PersonDetails['id']): Promise<PersonDetails> {
    const { data } = await http.get<PersonDetailsDto>(personDetailsUrl, { params: { UserId: userId } });
    const person = personMapper.fromPersonDetailsDto(data);

    return person;
  }
}
