import { Node } from '../../models/node';
import { NodesFilter } from '../../models/nodeFilters';
import { Person } from '../../models/person';
import { NodeDto } from '../dto/nodes/nodeDto';
import { http } from '../http';
import { nodeMapper } from '../mappers/nodeMapper';

export namespace NodeApi {
  const nodeUrlGet = 'api/employee/getEmployeesByCity';
  const getNodeByPersonIdUrl = 'api/employee/user-structure';

  export async function get(filters: NodesFilter): Promise<Node> {
    const params = new URLSearchParams();
    params.append('LocationName', filters.location.name);
    const filterDisplaysList = filters.displayedLevels
      .filter(filter => filter.isSelected)
      .map(filter => {
        return {
          structureName: filter.division.name,
          structureEnum: filter.variant,
        };
      });

    filterDisplaysList.forEach(filter => {
      params.append('FilterDisplaysList', JSON.stringify(filter));
    });
    const request = {
      params: params,
    };
    const { data } = await http.get<NodeDto>(nodeUrlGet, request);
    const nodes = nodeMapper.fromDto(data);

    return nodes;
  }

  export async function getNodeByPersonId(id: Person['id']): Promise<Node> {
    const { data } = await http.get<NodeDto>(getNodeByPersonIdUrl, {
      params: {
        UserId: id,
      },
    });

    const nodes = nodeMapper.fromDto(data);

    return nodes;
  }
}
