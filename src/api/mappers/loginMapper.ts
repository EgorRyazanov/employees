import { EntityValidationErrors } from '../../models/appError';
import { Login } from '../../models/login';
import { extractErrorMessage } from '../../utils/extractErrorMessage';
import { LoginDto } from '../dto/loginDto';
import { ValidationErrorDto } from '../dto/validationErrorDto';
import { Mapper, ValidationErrorMapper } from './mapper';

class LoginMapper implements Mapper<LoginDto, Login>, ValidationErrorMapper<LoginDto, Login> {
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

  public validationErrorFromDto(errorDto?: ValidationErrorDto<LoginDto> | null): EntityValidationErrors<Login> {
    return {
      email: extractErrorMessage(errorDto?.email),
      password: extractErrorMessage(errorDto?.password) ?? extractErrorMessage(errorDto?.non_field_errors),
    };
  }
}

export const loginMapper = new LoginMapper();
