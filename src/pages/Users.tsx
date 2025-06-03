import React from 'react';
import {
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  Chip,
  IconButton,
  useTheme,
} from '@mui/material';
import { MoreVertical, UserPlus } from 'lucide-react';

const Users = () => {
  const theme = useTheme();

  const users = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      role: 'Admin',
      status: 'Active',
      lastActive: '2 hours ago',
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      role: 'Editor',
      status: 'Active',
      lastActive: '1 day ago',
    },
    {
      id: 3,
      name: 'Mike Johnson',
      email: 'mike@example.com',
      role: 'User',
      status: 'Inactive',
      lastActive: '1 week ago',
    },
    {
      id: 4,
      name: 'Sarah Williams',
      email: 'sarah@example.com',
      role: 'Editor',
      status: 'Active',
      lastActive: '3 hours ago',
    },
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <Typography variant="h4" component="h1" className="font-bold">
          Users
        </Typography>
        <IconButton
          color="primary"
          className="bg-primary-50"
          sx={{ bgcolor: theme.palette.primary.main + '14' }}
        >
          <UserPlus size={24} />
        </IconButton>
      </div>

      <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>User</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Last Active</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id} hover>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar>{user.name[0]}</Avatar>
                    <div>
                      <Typography variant="subtitle2">{user.name}</Typography>
                      <Typography variant="body2" color="textSecondary">
                        {user.email}
                      </Typography>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Chip
                    label={user.role}
                    size="small"
                    color={user.role === 'Admin' ? 'primary' : 'default'}
                  />
                </TableCell>
                <TableCell>
                  <Chip
                    label={user.status}
                    size="small"
                    color={user.status === 'Active' ? 'success' : 'default'}
                  />
                </TableCell>
                <TableCell>{user.lastActive}</TableCell>
                <TableCell align="right">
                  <IconButton size="small">
                    <MoreVertical size={16} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Users;