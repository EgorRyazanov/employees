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
import { filtersSelectors } from '../../../../store/filters/selectors';
import styles from './MainPage.module.scss';
import { NodeDetailsModal } from '../../components/NodeDetailsModal/NodeDetailsModal';
import { NodeDetailsStore } from '../../../../store/nodeDetails';
import { nodeDetailsSelectors } from '../../../../store/nodeDetails/selectors';

const NODE_SHIFT = 450;
const NODE_PADDING = 60;

const MainPageComponent: FC = () => {
  const dispatch = useAppDispatch();

  const nodes = useAppSelector(nodeSelectors.SelectNodes);
  const isLoading = useAppSelector(nodeSelectors.SelectIsNodesLoading);
  const options = useAppSelector(transformOptionsSelectors.SelectOptions);
  const selectedLocation = useAppSelector(filtersSelectors.SelectLocation);
  const filterDisplayedLevels = useAppSelector(filtersSelectors.SelectFilterLevelDisplayed);
  const isModalActive = useAppSelector(nodeDetailsSelectors.SelectIsModalActive);

  const handleMainNodeDrop = () => {
    dispatch(NodeDetailsStore.actions.removeNode());
  };

  useEffect(() => {
    if (selectedLocation != null && filterDisplayedLevels != null) {
      dispatch(NodesStore.thunks.getNodes({ location: selectedLocation, displayedLevels: filterDisplayedLevels }));
    }
  }, [dispatch, selectedLocation, filterDisplayedLevels]);

  return (
    <Box sx={{ overflow: 'hidden' }}>
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
        <TransformComponent wrapperClass={styles.container}>
          <Box sx={{ width: '100vw', height: '80vh', position: 'relative' }}>
            {selectedLocation != null &&
              nodes?.next.map((node, index) => (
                <HeaderNode key={node.id} left={index * NODE_SHIFT + NODE_PADDING} node={node} />
              ))}
            {isModalActive && <NodeDetailsModal isOpened={isModalActive} toggleModal={handleMainNodeDrop} />}
          </Box>
        </TransformComponent>
      </TransformWrapper>
    </Box>
  );
};

export const MainPage = typedMemo(MainPageComponent);
