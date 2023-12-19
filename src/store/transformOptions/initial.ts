import { TransformOptions } from '../../models/transformOptions';

export type TransofrmState = {
  options: TransformOptions;
};

export const initialState: TransofrmState = {
  options: {
    wheelDisapled: false,
  },
};
