import { Login } from '../../models/login';
import { User } from '../../models/user';
import { UserSecret } from '../../models/userSecret';
import { UserDto } from '../dto/userDto';
import { UserSecretDto } from '../dto/userSecret';
import { http } from '../http';
import { loginMapper } from '../mappers/loginMapper';
import { userMapper } from '../mappers/userMapper';
import { userSecretMapper } from '../mappers/userSecretMapper';

export namespace AuthApi {
  const authUrl = 'api/auth/';

  export async function login(login: Login): Promise<User> {
    const { data } = await http.post<UserDto>(authUrl, loginMapper.toDto(login));
    const user = userMapper.fromDto(data);

    return user;
  }

  export async function refreshSecret(secret: UserSecret): Promise<UserSecret> {
    const { data: newSecretDto } = await http.post<UserSecretDto>(authUrl, userSecretMapper.toDto(secret));

    return userSecretMapper.fromDto(newSecretDto);
  }
}
