import { Location } from '../../models/location';
import { Node } from '../../models/node';
import { NodeDto } from '../dto/nodes/nodeDto';
import { http } from '../http';
import { nodeMapper } from '../mappers/nodeMapper';

export namespace NodeApi {
  const nodeUrlGet = 'api/employee/getEmployeesByCity';

  export async function get(location: Location): Promise<Node> {
    const { data } = await http.get<NodeDto>(nodeUrlGet, { params: { LocationName: location.name } });
    const nodes = nodeMapper.fromDto(data);

    return nodes;
  }
}
