import React from 'react';
import { Box, useTheme } from '@mui/material';
import Sidebar from '../components/Sidebar';

type MainLayoutProps = {
  children: React.ReactNode;
  onPageChange: (page: string) => void;
};

const MainLayout = ({ children, onPageChange }: MainLayoutProps) => {
  const theme = useTheme();

  return (
    <Box 
      sx={{ 
        display: 'flex',
        minHeight: '100vh',
        bgcolor: theme.palette.background.default,
        color: theme.palette.text.primary,
      }}
      className="transition-colors duration-300"
    >
      <Sidebar 
        open={true} 
        onClose={() => {}} 
        onPageChange={onPageChange}
      />
      <Box 
        component="main" 
        sx={{ 
          flexGrow: 1,
          width: '100%',
          marginLeft: '250px', // Sidebar width
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default MainLayout;
