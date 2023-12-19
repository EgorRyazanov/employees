import { Login } from '../../models/login';
import { UserSecret } from '../../models/userSecret';
import { UserSecretDto } from '../dto/userSecret';
import { http } from '../http';
import { loginMapper } from '../mappers/loginMapper';
import { userSecretMapper } from '../mappers/userSecretMapper';

export namespace AuthApi {
  const authUrl = 'api/auth/';

  export async function login(login: Login): Promise<UserSecret> {
    const { data } = await http.post<UserSecretDto>(authUrl, loginMapper.toDto(login));
    const secret = userSecretMapper.fromDto(data);

    return secret;
  }

  export async function refreshSecret(secret: UserSecret): Promise<UserSecret> {
    const { data: newSecretDto } = await http.put<UserSecretDto>(authUrl, userSecretMapper.toDto(secret));

    return userSecretMapper.fromDto(newSecretDto);
  }
}
