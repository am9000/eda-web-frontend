import React from 'react';
import {
  Typography,
  Paper,
  Switch,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Divider,
  Button,
  useTheme,
} from '@mui/material';
import { Bell, Shield, Globe, Mail, Key } from 'lucide-react';

const Settings = () => {
  const theme = useTheme();

  const settingSections = [
    {
      title: 'Notifications',
      icon: <Bell size={20} />,
      settings: [
        { name: 'Email Notifications', description: 'Receive email updates', enabled: true },
        { name: 'Push Notifications', description: 'Receive push notifications', enabled: false },
      ],
    },
    {
      title: 'Privacy',
      icon: <Shield size={20} />,
      settings: [
        { name: 'Profile Visibility', description: 'Make profile public', enabled: true },
        { name: 'Activity Status', description: 'Show when you\'re active', enabled: true },
      ],
    },
    {
      title: 'Language & Region',
      icon: <Globe size={20} />,
      settings: [
        { name: 'Use System Settings', description: 'Match system preferences', enabled: true },
      ],
    },
  ];

  return (
    <div className="p-6">
      <Typography variant="h4" component="h1" className="font-bold mb-6">
        Settings
      </Typography>

      <div className="grid gap-6">
        {settingSections.map((section, index) => (
          <Paper key={index} className="p-4" sx={{ borderRadius: 2 }}>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-primary-600" style={{ color: theme.palette.primary.main }}>
                {section.icon}
              </span>
              <Typography variant="h6">{section.title}</Typography>
            </div>
            <List>
              {section.settings.map((setting, settingIndex) => (
                <React.Fragment key={settingIndex}>
                  <ListItem>
                    <ListItemText
                      primary={setting.name}
                      secondary={setting.description}
                    />
                    <ListItemSecondaryAction>
                      <Switch
                        edge="end"
                        checked={setting.enabled}
                        onChange={() => {}}
                      />
                    </ListItemSecondaryAction>
                  </ListItem>
                  {settingIndex < section.settings.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          </Paper>
        ))}

        <Paper className="p-4" sx={{ borderRadius: 2 }}>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-primary-600" style={{ color: theme.palette.primary.main }}>
              <Key size={20} />
            </span>
            <Typography variant="h6">Account Security</Typography>
          </div>
          <div className="space-y-4">
            <Button variant="outlined" fullWidth>
              Change Password
            </Button>
            <Button variant="outlined" fullWidth>
              Enable Two-Factor Authentication
            </Button>
          </div>
        </Paper>
      </div>
    </div>
  );
};

export default Settings;