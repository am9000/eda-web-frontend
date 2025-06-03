import React, { useState } from 'react';
import {
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Button,
  Box,
  IconButton,
} from '@mui/material';
import { RefreshCw } from 'lucide-react';

// Mock data - replace with actual API calls
const mockTasks = [
  {
    id: 1,
    status: 'IN_PROGRESS',
    loadDate: '2024-02-28',
    dataset: 'Dataset A',
    startDate: '2024-01-01',
    endDate: '2024-01-31',
  },
  {
    id: 2,
    status: 'COMPLETED',
    loadDate: '2024-02-27',
    dataset: 'Dataset B',
    startDate: '2024-01-01',
    endDate: '2024-01-31',
  },
  {
    id: 3,
    status: 'ERROR',
    loadDate: '2024-02-26',
    dataset: 'Dataset C',
    startDate: '2024-01-01',
    endDate: '2024-01-31',
  },
];

const mockLogs = `
[2024-02-28 10:00:01] Starting data load for Dataset A
[2024-02-28 10:00:02] Connecting to data source
[2024-02-28 10:00:03] Loading data for period 2024-01-01 to 2024-01-31
[2024-02-28 10:00:04] Processing records...
`;

const Status = () => {
  const [selectedTask, setSelectedTask] = useState<number | null>(null);
  const [logs, setLogs] = useState<string>('');

  const handleRefresh = () => {
    // TODO: Implement actual API call to refresh status
    console.log('Refreshing status...');
  };

  const handleTaskClick = (taskId: number) => {
    setSelectedTask(taskId);
    setLogs(mockLogs);
  };

  const getStatusChip = (status: string) => {
    const statusProps = {
      IN_PROGRESS: { color: 'primary' as const, label: 'In Progress' },
      COMPLETED: { color: 'success' as const, label: 'Completed' },
      ERROR: { color: 'error' as const, label: 'Error' },
    }[status] || { color: 'default' as const, label: status };

    return <Chip {...statusProps} size="small" />;
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <Typography variant="h4" component="h1" className="font-bold">
          Status
        </Typography>
        <IconButton onClick={handleRefresh} color="primary">
          <RefreshCw size={20} />
        </IconButton>
      </div>

      <div className="grid gap-6">
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Status</TableCell>
                <TableCell>Load Date</TableCell>
                <TableCell>Dataset</TableCell>
                <TableCell>Start Date</TableCell>
                <TableCell>End Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mockTasks.map((task) => (
                <TableRow
                  key={task.id}
                  hover
                  onClick={() => handleTaskClick(task.id)}
                  className="cursor-pointer"
                  selected={selectedTask === task.id}
                >
                  <TableCell>{getStatusChip(task.status)}</TableCell>
                  <TableCell>{task.loadDate}</TableCell>
                  <TableCell>{task.dataset}</TableCell>
                  <TableCell>{task.startDate}</TableCell>
                  <TableCell>{task.endDate}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {selectedTask && (
          <Paper className="p-4">
            <Typography variant="h6" gutterBottom>
              Task Logs
            </Typography>
            <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto whitespace-pre-wrap">
              {logs}
            </pre>
          </Paper>
        )}
      </div>
    </div>
  );
};

export default Status;