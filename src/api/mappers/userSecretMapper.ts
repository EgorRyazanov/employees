import { UserSecret } from '../../models/userSecret';
import { UserSecretDto } from '../dto/userSecret';
import { Mapper } from './mapper';

class UserSecretMapper implements Mapper<UserSecretDto, UserSecret> {
  public toDto(data: UserSecret): UserSecretDto {
    return {
      token: data.token,
    };
  }

  public fromDto(dto: UserSecretDto): UserSecret {
    return {
      token: dto.token,
    };
  }
}

/** Instance of the user secrets mapper. */
export const userSecretMapper = new UserSecretMapper();
