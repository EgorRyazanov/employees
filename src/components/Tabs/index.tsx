import { TabsProps, Tabs, styled } from '@mui/material';

export const TabsComponent = styled(Tabs)<TabsProps>(() => ({
  '& .MuiTabs-flexContainer': {
    border: '1px solid #14191A1F',
    borderRadius: '4px',
  },

  '& .Mui-selected': {
    backgroundColor: '#F6F6F4',
    border: '1px solid #14191a3d',
  },
}));
