import React, { useState, useEffect } from 'react';
import {
  Typography,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  TextField,
  Box,
  Alert,
  Snackbar,
} from '@mui/material';
import { Play } from 'lucide-react';

const Parameters = () => {
  const [datasets, setDatasets] = useState<{ id: number; name: string }[]>([]);
  const [selectedDataset, setSelectedDataset] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    fetch('/api/datasets.json')
      .then((res) => res.json())
      .then((data) => setDatasets(data))
      .catch(() => setDatasets([]));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement actual API call
    console.log('Submitting:', { selectedDataset, startDate, endDate });
    setShowSuccess(true);
  };

  return (
    <div className="p-6">
      <Typography variant="h4" component="h1" className="font-bold mb-6">
        Parameters
      </Typography>

      <Paper className="p-6" component="form" onSubmit={handleSubmit}>
        <Box className="space-y-6">
          <FormControl fullWidth>
            <InputLabel>Dataset</InputLabel>
            <Select
              value={selectedDataset}
              label="Dataset"
              onChange={(e) => setSelectedDataset(e.target.value)}
              required
            >
              {datasets.map((dataset) => (
                <MenuItem key={dataset.id} value={dataset.name}>
                  {dataset.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TextField
              label="Start Date"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
              required
              fullWidth
            />
            <TextField
              label="End Date"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
              required
              fullWidth
            />
          </div>

          <Button
            type="submit"
            variant="contained"
            size="large"
            startIcon={<Play size={20} />}
            className="mt-4"
            fullWidth
          >
            Run Loading and Analysis
          </Button>
        </Box>
      </Paper>

      <Snackbar
        open={showSuccess}
        autoHideDuration={6000}
        onClose={() => setShowSuccess(false)}
      >
        <Alert severity="success" onClose={() => setShowSuccess(false)}>
          Analysis task started successfully!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Parameters;