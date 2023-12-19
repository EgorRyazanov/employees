import { FC } from 'react';
import { Box, Modal, Typography } from '@mui/material';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import { typedMemo } from '../../../../utils/typedMemo';
import { Node } from '../../../../models/node';

interface NodeDetailsModalComponentProps {
  isOpened: boolean;
  node: Node;
  toggleModal: () => void;
}

const NodeDetailsModalComponent: FC<NodeDetailsModalComponentProps> = ({ isOpened, toggleModal, node }) => {
  return (
    <Modal sx={{ border: 'none' }} open={isOpened} onClose={toggleModal}>
      <Box
        sx={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          width: '400px',
          padding: '24px',
          transform: 'translate(-50%, -50%)',
          outline: 'none',
          borderRadius: '4px',
          backgroundColor: '#ffffff',
        }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <Typography>{node.name}</Typography>
          <IconButton onClick={toggleModal}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Box sx={{ display: 'flex', gap: '12px' }}>
            <Typography sx={{ color: '#A8A19A' }}>Участников:</Typography>
            <Typography>{node.userCount}</Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: '12px' }}>
            <Typography sx={{ color: '#A8A19A' }}>Количество вакансий:</Typography>
            <Typography>{node.vacancyCount}</Typography>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export const NodeDetailsModal = typedMemo(NodeDetailsModalComponent);
