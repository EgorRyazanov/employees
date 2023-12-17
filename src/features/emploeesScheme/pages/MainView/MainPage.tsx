import { FC, useEffect } from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { Box, LinearProgress } from '@mui/material';

import { typedMemo } from '../../../../utils/typedMemo';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { NodesStore } from '../../../../store/node';
import { nodeSelectors } from '../../../../store/node/selectors';
import { HeaderNode } from '../../components/HeaderNode';
import { Filters } from '../../components/Filters';

const NODE_SHIFT = 500;

const MainPageComponent: FC = () => {
  const dispatch = useAppDispatch();
  const nodes = useAppSelector(nodeSelectors.SelectNodes);
  const isLoading = useAppSelector(nodeSelectors.SelectIsNodesLoading);
  useEffect(() => {
    dispatch(NodesStore.thunks.getNodes());
  }, [dispatch]);

  return (
    <div>
      {isLoading && <LinearProgress />}
      <TransformWrapper initialScale={1} minScale={0.5} maxScale={3} limitToBounds={false} pinch={{ step: 5 }}>
        <TransformComponent>
          <Box sx={{ width: '100vw', height: '100vh', position: 'relative' }}>
            <Filters />
            {nodes?.next.map((node, index) => <HeaderNode key={node.id} left={index * NODE_SHIFT + 60} node={node} />)}
          </Box>
        </TransformComponent>
      </TransformWrapper>
    </div>
  );
};

export const MainPage = typedMemo(MainPageComponent);
