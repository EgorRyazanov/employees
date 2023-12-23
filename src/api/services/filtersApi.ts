import { Division } from '../../models/division';
import { Location } from '../../models/location';
import { DivisionDto } from '../dto/divisionDto';
import { LocationDto } from '../dto/locationDto';
import { http } from '../http';
import { divisionMapper } from '../mappers/divistionMapper';
import { locationMapper } from '../mappers/locationMapper';

export namespace FiltersApi {
  const locationsUrl = 'api/structure/getLocations';
  const divisionsUrl = 'api/structure/getDivisionByLocation';

  export async function getLocations(): Promise<Location[]> {
    const { data } = await http.get<LocationDto[]>(locationsUrl);
    const locations = data.map(locationDto => locationMapper.fromDto(locationDto));

    return locations;
  }

  export async function getDivisions(location: Location): Promise<Division[]> {
    const { data } = await http.get<DivisionDto[]>(divisionsUrl, {
      params: {
        Location: location.name,
      },
    });
    const divisions = data.map(divisionDto => divisionMapper.fromDto(divisionDto));

    return divisions;
  }
}
