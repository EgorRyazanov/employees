import { NodeDto } from './nodeDto';

export interface NodeResponseDto {
  readonly $id: number;
  readonly Response: NodeDto;
}
