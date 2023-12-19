import { STATUS } from '../../api/services/utils/status';
import { Node } from '../../models/node';

export type NodesState = {
  nodes: Node | null;
  status: STATUS;
};

export const initialState: NodesState = {
  status: STATUS.initial,
  nodes: null,
};
