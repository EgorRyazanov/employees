import { STATUS } from '../../api/services/utils/status';
import { ObjectWithMetadata } from '../../models/objectWithMetadata';
import { PersonDetails } from '../../models/personDetails';

export type NodesState = {
  persons: ObjectWithMetadata<readonly PersonDetails[]> | null;
  status: STATUS;
};

export const initialState: NodesState = {
  status: STATUS.initial,
  persons: null,
};
