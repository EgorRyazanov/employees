import { FC, useEffect } from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { Box, LinearProgress } from '@mui/material';

import { typedMemo } from '../../../../utils/typedMemo';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { NodesStore } from '../../../../store/node';
import { nodeSelectors } from '../../../../store/node/selectors';
import { HeaderNode } from '../../components/HeaderNode';
import { Filters } from '../../components/Filters';
import { transformOptionsSelectors } from '../../../../store/transformOptions/selectors';

const NODE_SHIFT = 500;
const NODE_PADDING = 60;

const MainPageComponent: FC = () => {
  const dispatch = useAppDispatch();
  const nodes = useAppSelector(nodeSelectors.SelectNodes);
  const isLoading = useAppSelector(nodeSelectors.SelectIsNodesLoading);
  const options = useAppSelector(transformOptionsSelectors.SelectOptions);

  useEffect(() => {
    dispatch(NodesStore.thunks.getNodes());
  }, [dispatch]);

  return (
    <div>
      {isLoading && <LinearProgress />}
      <TransformWrapper
        initialScale={1}
        minScale={0.5}
        maxScale={3}
        limitToBounds={false}
        pinch={{ step: 5 }}
        wheel={{
          wheelDisabled: options.wheelDisapled,
        }}>
        <Filters />
        <TransformComponent>
          <Box sx={{ width: '100vw', height: '100vh', position: 'relative' }}>
            {nodes?.next.map((node, index) => (
              <HeaderNode key={node.id} left={index * NODE_SHIFT + NODE_PADDING} node={node} />
            ))}
          </Box>
        </TransformComponent>
      </TransformWrapper>
    </div>
  );
};

export const MainPage = typedMemo(MainPageComponent);
