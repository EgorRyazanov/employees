import { Node } from '../../models/node';
import { NodeResponseDto } from '../dto/nodes/nodeResponse';
import { http } from '../http';
import { nodeMapper } from '../mappers/nodeMapper';

export namespace NodeApi {
  const nodeUrlGet = 'api/employee/getEmployeesByCity';

  export async function get(): Promise<Node> {
    const { data } = await http.get<NodeResponseDto>(nodeUrlGet, { params: { LocationName: 'Брусника.Екатеринбург' } });
    const nodes = nodeMapper.fromDto(data.Response);

    return nodes;
  }
}
