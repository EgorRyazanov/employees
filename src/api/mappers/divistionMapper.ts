import { Division } from '../../models/division';
import { DivisionDto } from '../dto/divisionDto';
import { MapperFromDto } from './mapper';

class DivisionMapper implements MapperFromDto<DivisionDto, Division> {
  public fromDto(dto: DivisionDto): Division {
    return {
      id: dto.id,
      name: dto.name,
      structureEnum: dto.structureEnum,
    };
  }
}

export const divisionMapper = new DivisionMapper();
