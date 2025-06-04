import React, { useState, useEffect } from 'react';
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

const Status = () => {
  const [tasks, setTasks] = useState<any[]>([]);
  const [selectedTask, setSelectedTask] = useState<number | null>(null);
  const [logs, setLogs] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [logsLoading, setLogsLoading] = useState(false);

  // Fetch tasks on mount or refresh
  const fetchTasks = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/tasks.json');
      const data = await res.json();
      setTasks(data);
    } catch (e) {
      setTasks([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleRefresh = () => {
    fetchTasks();
  };

  const handleTaskClick = async (taskId: number) => {
    setSelectedTask(taskId);
    setLogsLoading(true);
    try {
      const res = await fetch(`/api/tasks/${taskId}/logs.json`);
      const data = await res.json();
      setLogs(Array.isArray(data) ? data.join('\n') : String(data));
    } catch (e) {
      setLogs('Failed to load logs.');
    } finally {
      setLogsLoading(false);
    }
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
              {loading ? (
                <TableRow>
                  <TableCell colSpan={5}>Loading...</TableCell>
                </TableRow>
              ) : (
                tasks.map((task) => (
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
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {selectedTask && (
          <Paper className="p-4">
            <Typography variant="h6" gutterBottom>
              Task Logs
            </Typography>
            {logsLoading ? (
              <Typography>Loading logs...</Typography>
            ) : (
              <pre className={"bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto whitespace-pre-wrap"}>
                {logs}
              </pre>
            )}
          </Paper>
        )}
      </div>
    </div>
  );
};

export default Status;