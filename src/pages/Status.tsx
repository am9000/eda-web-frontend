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
  IconButton,
} from '@mui/material';
import { RefreshCw } from 'lucide-react';

const Status = () => {
  const [tasks, setTasks] = useState<any[]>([]);
  const [selectedTask, setSelectedTask] = useState<number | null>(null);
  const [logs, setLogs] = useState<any[]>([]);
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
      setLogs(Array.isArray(data) ? data : []);
    } catch (e) {
      setLogs([]);
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

  const getLevelChip = (level: string) => {
    const levelProps = {
      INFO: { color: 'info' as const, label: 'Info' },
      WARNING: { color: 'warning' as const, label: 'Warning' },
      ERROR: { color: 'error' as const, label: 'Error' },
      DEBUG: { color: 'default' as const, label: 'Debug' },
    }[level] || { color: 'default' as const, label: level };
    return <Chip {...levelProps} size="small" />;
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
        <TableContainer component={Paper} sx={{ maxHeight: '400px', overflowY: 'auto' }}>
          <Table stickyHeader>
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
              <TableContainer sx={{ maxHeight: '400px', overflowY: 'auto' }}>
                <Table stickyHeader>
                  <TableHead>
                    <TableRow>
                      <TableCell>Timestamp</TableCell>
                      <TableCell>Level</TableCell>
                      <TableCell>Message</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {logs.length > 0 ? logs.map((log, idx) => (
                      <TableRow key={idx}>
                        <TableCell>{log.timestamp}</TableCell>
                        <TableCell>{getLevelChip(log.level)}</TableCell>
                        <TableCell>{log.message}</TableCell>
                      </TableRow>
                    )) : (
                      <TableRow>
                        <TableCell colSpan={3}>No logs found.</TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </Paper>
        )}
      </div>
    </div>
  );
};

export default Status;
