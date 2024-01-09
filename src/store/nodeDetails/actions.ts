import { createAction } from '@reduxjs/toolkit';

import { Node } from '../../models/node';

const name = 'nodeDetails';

export const actions = {
  setNode: createAction<Node>(`${name}/setNode`),
  removeNode: createAction(`${name}/removeNode`),
};
