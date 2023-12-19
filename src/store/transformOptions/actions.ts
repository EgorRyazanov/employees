import { createAction } from '@reduxjs/toolkit';
import { TransformOptions } from '../../models/transformOptions';

const name = 'transformOption';

export const actions = {
  change: createAction<TransformOptions>(`${name}/change`),
};
