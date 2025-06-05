import React from 'react';
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  useTheme,
} from '@mui/material';
import { 
  LayoutDashboard, 
  Settings, 
  Users, 
  HelpCircle, 
  Sliders, 
  Activity, 
  LineChart 
} from 'lucide-react';

type SidebarProps = {
  open: boolean;
  onClose: () => void;
  onPageChange: (page: string) => void;
};

const Sidebar = ({ onPageChange }: SidebarProps) => {
  const theme = useTheme();
  
  const menuItems = [
    { text: 'Dashboard', icon: <LayoutDashboard size={20} />, page: 'dashboard' },
    { text: 'Parameters', icon: <Sliders size={20} />, page: 'parameters' },
    { text: 'Status', icon: <Activity size={20} />, page: 'status' },
    { text: 'Analysis', icon: <LineChart size={20} />, page: 'analysis' },
    { text: 'Users', icon: <Users size={20} />, page: 'users' },
    { text: 'Settings', icon: <Settings size={20} />, page: 'settings' },
    { text: 'Help', icon: <HelpCircle size={20} />, page: 'help' },
  ];

  // Static sidebar always visible on the left
  return (
    <div
      style={{
        width: 250,
        minHeight: '100vh',
        background: theme.palette.background.paper,
        color: theme.palette.text.primary,
        boxSizing: 'border-box',
        borderRight: `1px solid ${theme.palette.divider}`,
        position: 'fixed',
        left: 0,
        top: 0,
        zIndex: 1100,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div className="p-4">
        <h2 className="text-xl font-bold">EDA GUI</h2>
      </div>
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              className="transition-colors duration-200 hover:bg-opacity-10"
              onClick={() => onPageChange(item.page)}
              sx={{
                '&:hover': {
                  bgcolor: theme.palette.primary.main + '14',
                },
              }}
            >
              <ListItemIcon sx={{ color: 'inherit' }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default Sidebar;
