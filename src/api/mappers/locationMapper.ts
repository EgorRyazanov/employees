import { Location } from '../../models/location';
import { LocationDto } from '../dto/locationDto';
import { MapperFromDto } from './mapper';

class LocationMapper implements MapperFromDto<LocationDto, Location> {
  public fromDto(dto: LocationDto): Location {
    return {
      id: dto.id,
      name: dto.name,
    };
  }
}

export const locationMapper = new LocationMapper();
