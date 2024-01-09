import { Node } from '../../models/node';

export type NodeDetailsState = {
  node: Node | null;
  isModalActive: boolean;
};

export const initialState: NodeDetailsState = {
  node: null,
  isModalActive: false,
};
