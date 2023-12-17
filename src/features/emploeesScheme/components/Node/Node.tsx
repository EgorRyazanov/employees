import { Box, IconButton, Typography } from '@mui/material';
import { FC, useState } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import GroupIcon from '@mui/icons-material/Group';

import { typedMemo } from '../../../../utils/typedMemo';
import { Node as NodeType } from '../../../../models/node';

interface NodeComponentProps {
  node: NodeType;
  space?: number;
}

const NodeComponent: FC<NodeComponentProps> = ({ node, space }) => {
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    setIsActive(!isActive);
  };

  return (
    <Box sx={{ marginLeft: `${space ?? 0}px` }}>
      <Box sx={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        <IconButton onClick={handleClick}>{isActive ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}</IconButton>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <GroupIcon />
          <Box>
            <Typography>{node.name}</Typography>
            {node.vacancyCount !== 0 && <Typography sx={{ color: '#A8A19A' }}>{node.vacancyCount} вакансии</Typography>}
          </Box>
        </Box>
      </Box>
      {isActive && node.next.map(nextNode => <Node key={nextNode.id} node={nextNode} space={space} />)}
    </Box>
  );
};

export const Node = typedMemo(NodeComponent);
