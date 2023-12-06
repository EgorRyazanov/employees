import { TabProps, Tab, styled } from '@mui/material';

export const TabComponent = styled(Tab)<TabProps>(() => ({
  '& ': {
    border: '1px solid #14191A1F',
    textTransform: 'capitalize',
    padding: '8px 16px',
    minHeight: 0,
  },
}));
