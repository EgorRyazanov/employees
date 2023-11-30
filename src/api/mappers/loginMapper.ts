import { Login } from '../../models/login';
import { LoginDto } from '../dto/loginDto';
import { Mapper } from './mapper';

class LoginMapper implements Mapper<LoginDto, Login> {
  public fromDto(dto: LoginDto): Login {
    return {
      email: dto.email,
      password: dto.password,
      rememberMe: dto.rememberMe,
    };
  }

  public toDto(data: Login): LoginDto {
    return {
      email: data.email,
      password: data.password,
      rememberMe: data.rememberMe,
    };
  }
}

export const loginMapper = new LoginMapper();
