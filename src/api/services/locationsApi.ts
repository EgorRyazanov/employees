import { removeEmptyValues } from '../../utils/removeEmptyValues';
import { http } from '../http';

export namespace LocationsApi {
  const locationsUrl = 'api/employee/locations-names';
  const departmentsUrl = 'api/employee/departments-names';
  const divisionsUrl = 'api/employee/divisions-names';

  export async function getLocations(): Promise<string[]> {
    const { data } = await http.get<string[]>(locationsUrl);

    return data;
  }

  export async function getDepartments(): Promise<string[]> {
    const { data } = await http.get<string[]>(departmentsUrl);

    return data;
  }

  export async function getDivisions(locationName?: string): Promise<string[]> {
    const params = {
      LocationName: locationName,
    };
    const { data } = await http.get<{ divisions: { name: string }[] }>(divisionsUrl, {
      params: removeEmptyValues(params),
    });

    return data.divisions.map(division => division.name);
  }
}
