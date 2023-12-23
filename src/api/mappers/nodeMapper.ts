import { Node } from '../../models/node';
import { NodeDto } from '../dto/nodes/nodeDto';
import { MapperFromDto } from './mapper';
import { personMapper } from './personMapper';

class NodeMapper implements MapperFromDto<NodeDto, Node> {
  public fromDto(dto: NodeDto): Node {
    return {
      id: dto.id,
      name: dto.name,
      next: dto.next.length > 0 ? dto.next.map(nodeDto => this.fromDto(nodeDto)) : [],
      employees: dto.employees.map(personDto => personMapper.fromDto(personDto)),
      employers: dto.employers.map(personDto => personMapper.fromDto(personDto)),
      userCount: dto.userCount,
      vacancyCount: dto.vacancyCount,
      isDisplay: dto.isDisplay,
      structureEnum: dto.structureEnum,
    };
  }
}

export const nodeMapper = new NodeMapper();
