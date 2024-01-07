import { removeEmptyValues } from '../../utils/removeEmptyValues';
import { http } from '../http';

export type Division = {
  readonly division?: string;
};

export type Location = {
  readonly location?: string;
};

export namespace LocationsApi {
  const locationsUrl = 'api/employee/locations-names';
  const departmentsUrl = 'api/employee/departments-names';
  const divisionsUrl = 'api/employee/divisions-names';

  export async function getLocations(): Promise<string[]> {
    const { data } = await http.get<string[]>(locationsUrl);

    return data;
  }

  export async function getDepartments(departmentsOptions: Division & Location): Promise<string[]> {
    const params = {
      LocationName: departmentsOptions.location,
      DivisonNames: departmentsOptions.division,
    };
    const { data } = await http.get<string[]>(departmentsUrl, { params: removeEmptyValues(params) });

    return data;
  }

  export async function getDivisions(divisionOption: Location): Promise<string[]> {
    const params = {
      LocationName: divisionOption.location,
    };
    const { data } = await http.get<string[]>(divisionsUrl, {
      params: removeEmptyValues(params),
    });

    return data;
  }
}
