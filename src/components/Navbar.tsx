import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, useTheme } from '@mui/material';
import { Sun, Moon, Menu } from 'lucide-react';
import { useThemeContext } from '../theme/ThemeContext';

type NavbarProps = {
  toggleDrawer: () => void;
};

const Navbar = ({ toggleDrawer }: NavbarProps) => {
  const theme = useTheme();
  const { mode, toggleColorMode } = useThemeContext();

  return (
    <AppBar 
      position="fixed" 
      color="primary" 
      elevation={0}
      className="transition-all duration-300"
      sx={{
        bgcolor: theme.palette.background.default,
        color: theme.palette.text.primary,
        borderBottom: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={toggleDrawer}
          sx={{ mr: 2 }}
        >
          <Menu size={24} />
        </IconButton>
        
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Material UI + Tailwind
        </Typography>
        
        <div className="hidden sm:flex items-center space-x-4">
          <Button color="inherit">Dashboard</Button>
          <Button color="inherit">Projects</Button>
          <Button color="inherit">Settings</Button>
        </div>
        
        <IconButton onClick={toggleColorMode} color="inherit">
          {mode === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;