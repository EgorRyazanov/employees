import { FC } from 'react';
import { Box, LinearProgress, Modal, Typography } from '@mui/material';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import { typedMemo } from '../../../../utils/typedMemo';
import { useAppSelector } from '../../../../hooks';
import { personSelectors } from '../../../../store/person/selectors';

interface PersonModalComponentProps {
  isOpened: boolean;
  toggleModal: () => void;
}

const PersonModalComponent: FC<PersonModalComponentProps> = ({ isOpened, toggleModal }) => {
  const person = useAppSelector(personSelectors.SelectPersonDetails);
  const isLoading = useAppSelector(personSelectors.SelectIsPersonDetailsLoading);

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
        {isLoading && <LinearProgress />}
        {person != null && !isLoading && (
          <>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <Typography>{person.fullName}</Typography>
              <IconButton onClick={toggleModal}>
                <CloseIcon />
              </IconButton>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <Box sx={{ display: 'flex', gap: '12px' }}>
                <Typography sx={{ color: '#A8A19A' }}>Должность:</Typography>
                <Typography>{person.position}</Typography>
              </Box>
              <Box sx={{ display: 'flex', gap: '12px' }}>
                <Typography sx={{ color: '#A8A19A' }}>Тип работы:</Typography>
                <Typography>{person.workType}</Typography>
              </Box>
              <Box sx={{ display: 'flex', gap: '12px' }}>
                <Typography sx={{ color: '#A8A19A' }}>Локация:</Typography>
                <Typography>{person.location}</Typography>
              </Box>
              <Box sx={{ display: 'flex', gap: '12px' }}>
                <Typography sx={{ color: '#A8A19A' }}>Почта:</Typography>
                <Typography>{person.email ?? '-'}</Typography>
              </Box>
              <Box sx={{ display: 'flex', gap: '12px' }}>
                <Typography sx={{ color: '#A8A19A' }}>Телефон:</Typography>
                <Typography>{person.phoneNumber ?? '-'}</Typography>
              </Box>
            </Box>
          </>
        )}
      </Box>
    </Modal>
  );
};

export const PersonModal = typedMemo(PersonModalComponent);
