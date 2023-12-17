import { Node } from '../../models/node';
import { NodeDto } from '../dto/nodes/nodeDto';
import { http } from '../http';
import { nodeMapper } from '../mappers/nodeMapper';

export namespace NodeApi {
  const nodeUrlGet = 'api/employee/getEmployeesByCity';

  export async function get(): Promise<Node> {
    const { data } = await http.get<NodeDto>(nodeUrlGet, { params: { LocationName: 'Брусника.Екатеринбург' } });
    console.log(data);
    const nodes = nodeMapper.fromDto(data);

    console.log(nodes);

    return nodes;
  }
}
