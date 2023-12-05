import { User } from '../../models/user';
import { UserDto } from '../dto/userDto';
import { http } from '../http';
import { userMapper } from '../mappers/userMapper';

export namespace UserApi {
  const authUrl = 'api/auth/';

  export async function getMe(): Promise<User> {
    const { data } = await http.get<UserDto>(authUrl);
    const user = userMapper.fromDto(data);

    return user;
  }
}
