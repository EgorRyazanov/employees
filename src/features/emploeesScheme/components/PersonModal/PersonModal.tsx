import { FC } from 'react';
import { Box, Modal, Typography } from '@mui/material';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import { typedMemo } from '../../../../utils/typedMemo';
import { Person } from '../../../../models/person';

interface UserModalComponentProps {
  user: Person;
  isOpened: boolean;
  toggleModal: () => void;
}

const PersonModalComponent: FC<UserModalComponentProps> = ({ user, isOpened, toggleModal }) => {
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
          <Typography>{user.fullName}</Typography>
          <IconButton onClick={toggleModal}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Box sx={{ display: 'flex', gap: '12px' }}>
            <Typography sx={{ color: '#A8A19A' }}>Должность:</Typography>
            <Typography>{user.position}</Typography>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export const PersonModal = typedMemo(PersonModalComponent);
