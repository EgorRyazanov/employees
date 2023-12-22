import { Node } from '../../models/node';
import { NodesFilter } from '../../models/nodeFilters';
import { NodeDto } from '../dto/nodes/nodeDto';
import { http } from '../http';
import { nodeMapper } from '../mappers/nodeMapper';

export namespace NodeApi {
  const nodeUrlGet = 'api/employee/getEmployeesByCity';

  export async function get(filters: NodesFilter): Promise<Node> {
    const filterDisplaysList = filters.displayedLevels
      .filter(filter => filter.isSelected)
      .map(filter => {
        return {
          structureName: filter.division.name,
          structureEnum: filter.variant,
        };
      });
    const { data } = await http.get<NodeDto>(nodeUrlGet, {
      params: {
        LocationName: filters.location.name,
        FilterDisplaysList: JSON.stringify(filterDisplaysList),
      },
      paramsSerializer: {
        indexes: true, // use brackets with indexes
      },
    });
    const nodes = nodeMapper.fromDto(data);

    return nodes;
  }
}
