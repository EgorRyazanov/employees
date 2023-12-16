import { Node } from '../../models/node';
import { NodeDto } from '../dto/nodes/nodeDto';
import { MapperFromDto } from './mapper';

class NodeMapper implements MapperFromDto<NodeDto, Node> {
  public fromDto(dto: NodeDto): Node {
    return {
      id: dto.$id,
      name: dto.Name,
      next: dto.Next.length > 0 ? dto.Next.map(nodeDto => this.fromDto(nodeDto)) : [],
    };
  }
}

export const nodeMapper = new NodeMapper();
