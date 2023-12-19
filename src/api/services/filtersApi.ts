import { Location } from '../../models/location';
import { LocationDto } from '../dto/locationDto';
import { http } from '../http';
import { locationMapper } from '../mappers/locationMapper';

export namespace FiltersApi {
  const locationsUrl = 'api/structure/getLocations';

  export async function getLocations(): Promise<Location[]> {
    const { data } = await http.get<LocationDto[]>(locationsUrl);
    const locations = data.map(locationDto => locationMapper.fromDto(locationDto));

    return locations;
  }
}
