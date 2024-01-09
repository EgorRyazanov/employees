import { removeEmptyValues } from '../../utils/removeEmptyValues';
import { http } from '../http';

export type Division = {
  readonly division?: string;
};

export type Location = {
  readonly location?: string;
};

export type Department = {
  readonly department?: string;
};

export type Group = {
  readonly group?: string;
};

export namespace LocationsApi {
  const locationsUrl = 'api/employee/locations-names';
  const departmentsUrl = 'api/employee/departments-names';
  const divisionsUrl = 'api/employee/divisions-names';
  const groupsUrl = 'api/employee/groups-names';
  const userPositionsUrl = 'api/employee/users-positions';

  export async function getLocations(): Promise<string[]> {
    const { data } = await http.get<string[]>(locationsUrl);

    return data;
  }

  export async function getDepartments(departmentsOptions: Division & Location): Promise<string[]> {
    const params = {
      LocationName: departmentsOptions.location,
      DivisonName: departmentsOptions.division,
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

  export async function getGroups(groupOptions: Division & Location & Department): Promise<string[]> {
    const params = {
      LocationName: groupOptions.location,
      DivisonName: groupOptions.division,
      DepartmentName: groupOptions.department,
    };
    const { data } = await http.get<string[]>(groupsUrl, {
      params: removeEmptyValues(params),
    });

    return data;
  }

  export async function getUsersPositions(
    positionsOptions: Division & Location & Department & Group,
  ): Promise<string[]> {
    const params = {
      LocationName: positionsOptions.location,
      DivisonName: positionsOptions.division,
      DepartmentName: positionsOptions.department,
      GroupName: positionsOptions.group,
    };
    const { data } = await http.get<string[]>(userPositionsUrl, {
      params: removeEmptyValues(params),
    });

    return data;
  }
}
