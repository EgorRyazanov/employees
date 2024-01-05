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

  export async function getDivisions(): Promise<string[]> {
    const { data } = await http.get<{ divisions: string[] }>(divisionsUrl);

    return data.divisions;
  }
}
