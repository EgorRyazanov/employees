import { Box, IconButton, Typography } from '@mui/material';
import { FC, useState } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import GroupIcon from '@mui/icons-material/Group';

import { typedMemo } from '../../../../utils/typedMemo';
import { Node as NodeType } from '../../../../models/node';
import { TransformOptionStore } from '../../../../store/transformOptions';
import { useAppDispatch } from '../../../../hooks';

interface NodeComponentProps {
  node: NodeType;
  space?: number;
}

const NodeComponent: FC<NodeComponentProps> = ({ node, space }) => {
  const dispatch = useAppDispatch();
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    setIsActive(!isActive);
  };

  const handleMouseEnter = () => {
    dispatch(TransformOptionStore.actions.change({ wheelDisapled: true }));
  };

  const handleMouseLeave = () => {
    dispatch(TransformOptionStore.actions.change({ wheelDisapled: false }));
  };

  return (
    <Box sx={{ paddingLeft: `${space ?? 0}px` }}>
      <Box sx={{ display: 'flex', gap: '8px', alignItems: 'center', cursor: 'pointer' }}>
        <IconButton onClick={handleClick}>{isActive ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}</IconButton>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <GroupIcon sx={{ color: '#A8A19A' }} />
          <Box>
            <Typography>{node.name}</Typography>
            {node.vacancyCount !== 0 && <Typography sx={{ color: '#A8A19A' }}>{node.vacancyCount} вакансии</Typography>}
          </Box>
        </Box>
      </Box>
      {isActive && (
        <Box>
          {node.next.map(nextNode => (
            <Node key={nextNode.id} node={nextNode} space={16} />
          ))}
          <Box
            sx={{ maxHeight: '280px', overflowY: 'auto', cursor: 'pointer' }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}>
            {node.employers.map(
              person =>
                !person.isVacancy && (
                  <Box key={person.id} sx={{ padding: '8px 12px', backgroundColor: '#E8F5E9' }}>
                    <Typography>{person.fullName}</Typography>
                    <Typography sx={{ color: '#A8A19A' }} variant="body2">
                      {person.position}
                    </Typography>
                  </Box>
                ),
            )}
          </Box>
          <Box
            sx={{ paddingLeft: '16px', maxHeight: '280px', overflowY: 'auto', cursor: 'pointer' }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}>
            {node.employees.map(
              person =>
                !person.isVacancy && (
                  <Box key={person.id} sx={{ padding: '8px 12px' }}>
                    <Typography>{person.fullName}</Typography>
                    <Typography sx={{ color: '#A8A19A' }} variant="body2">
                      {person.position}
                    </Typography>
                  </Box>
                ),
            )}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export const Node = typedMemo(NodeComponent);
