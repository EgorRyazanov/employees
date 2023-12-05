import { User } from '../../models/user';
import { UserDto } from '../dto/userDto';
import { MapperFromDto } from './mapper';

class UserMapper implements MapperFromDto<UserDto, User> {
  public fromDto(dto: UserDto): User {
    return {
      id: dto.id,
      fullName: dto.fullName,
      email: dto.email,
      lastLogin: dto.lastLogin != null ? new Date(dto.lastLogin) : null,
    };
  }
}

export const userMapper = new UserMapper();
