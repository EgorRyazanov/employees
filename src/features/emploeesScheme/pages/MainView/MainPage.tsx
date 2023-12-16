import { FC, useEffect } from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { Box } from '@mui/material';

import { typedMemo } from '../../../../utils/typedMemo';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { NodesStore } from '../../../../store/node';
import { nodeSelectors } from '../../../../store/node/selectors';

const MainPageComponent: FC = () => {
  const dispatch = useAppDispatch();
  const nodes = useAppSelector(nodeSelectors.SelectNodes);
  useEffect(() => {
    dispatch(NodesStore.thunks.getNodes());
  }, [dispatch]);

  useEffect(() => {
    console.log(nodes);
  }, [nodes]);

  return (
    <div>
      <TransformWrapper initialScale={1} minScale={0.5} maxScale={3} limitToBounds={false} pinch={{ step: 5 }}>
        <TransformComponent>
          <Box sx={{ width: '100vw', height: '100vh' }}>
            <Box sx={{ width: 300, height: 300, backgroundColor: 'gray' }}>Test</Box>
          </Box>
        </TransformComponent>
      </TransformWrapper>
    </div>
  );
};

export const MainPage = typedMemo(MainPageComponent);
