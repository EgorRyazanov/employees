import { FC } from 'react';

import { typedMemo } from '../../../../utils/typedMemo';

const MainPageComponent: FC = () => {
  return <div>MainView</div>;
};

export const MainPage = typedMemo(MainPageComponent);
