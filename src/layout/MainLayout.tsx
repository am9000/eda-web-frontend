import React, { useState } from 'react';
import { Box, Toolbar, useTheme } from '@mui/material';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

type MainLayoutProps = {
  children: React.ReactNode;
  onPageChange: (page: string) => void;
};

const MainLayout = ({ children, onPageChange }: MainLayoutProps) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

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
      <Navbar toggleDrawer={toggleDrawer} />
      <Sidebar 
        open={drawerOpen} 
        onClose={() => setDrawerOpen(false)} 
        onPageChange={(page) => {
          onPageChange(page);
          setDrawerOpen(false);
        }}
      />
      
      <Box 
        component="main" 
        sx={{ 
          flexGrow: 1,
          width: '100%',
        }}
      >
        <Toolbar /> {/* Spacer for fixed app bar */}
        {children}
      </Box>
    </Box>
  );
};

export default MainLayout;