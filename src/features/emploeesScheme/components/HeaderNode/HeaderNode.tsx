import { Box, IconButton, Typography } from '@mui/material';
import { FC, useState } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import { typedMemo } from '../../../../utils/typedMemo';
import { Node as NodeType } from '../../../../models/node';
import { Node } from '../Node';
import styles from './HeaderNode.module.scss';

interface NodeComponentProps {
  node: NodeType;
  left: number;
}

const HeaderNodeComponent: FC<NodeComponentProps> = ({ node, left }) => {
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    setIsActive(!isActive);
  };

  return (
    <div className={styles.cardContainer} style={{ left: `${left}px`, position: 'absolute' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <Typography>{node.name}</Typography>
        <IconButton onClick={handleClick}>{isActive ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}</IconButton>
      </Box>
      <Box sx={{ display: 'flex', border: '1px solid #14191A1F', borderRadius: '4px', marginBottom: '24px' }}>
        <Box sx={{ padding: '8px 12px', backgroundColor: '#F6F6F4', borderRight: '1px solid #14191A1F' }}>
          Брусника.Екатеринбург
        </Box>
        <Box sx={{ padding: '8px 12px' }}>{node.userCount} чел.</Box>
      </Box>
      {isActive && node.next.map(nextNode => <Node key={nextNode.id} node={nextNode} space={16} />)}
    </div>
  );
};

export const HeaderNode = typedMemo(HeaderNodeComponent);
