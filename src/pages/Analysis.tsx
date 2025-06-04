import React, { useState, useEffect } from 'react';
import {
  Typography,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

const Analysis = () => {
  const [datasets, setDatasets] = useState<{ id: number; name: string }[]>([]);
  const [selectedDataset, setSelectedDataset] = useState<number | null>(null);
  const [analyses, setAnalyses] = useState<any[]>([]);
  const [selectedAnalysis, setSelectedAnalysis] = useState<number | null>(null);
  const [results, setResults] = useState<any>(null);

  useEffect(() => {
    fetch('/api/datasets.json')
      .then((res) => res.json())
      .then((data) => setDatasets(data))
      .catch(() => setDatasets([]));
  }, []);

  const handleDatasetChange = async (event: any) => {
    const datasetId = Number(event.target.value);
    setSelectedDataset(datasetId);
    setSelectedAnalysis(null);
    setResults(null);
    try {
      const res = await fetch(`/api/datasets/${datasetId}/analyses.json`);
      const data = await res.json();
      setAnalyses(data);
    } catch {
      setAnalyses([]);
    }
  };

  const handleAnalysisSelect = async (analysisId: number) => {
    setSelectedAnalysis(analysisId);
    try {
      const res = await fetch(`/api/analyses/${analysisId}/results.json`);
      const data = await res.json();
      setResults(data);
    } catch {
      setResults(null);
    }
  };

  return (
    <div className="p-6">
      <Typography variant="h4" component="h1" className="font-bold mb-6">
        Analysis Results
      </Typography>

      <Paper className="p-6 mb-6">
        <div className="grid gap-6">
          <FormControl fullWidth>
            <InputLabel>Dataset</InputLabel>
            <Select
              value={selectedDataset ?? ''}
              label="Dataset"
              onChange={handleDatasetChange}
            >
              {datasets.map((dataset) => (
                <MenuItem key={dataset.id} value={dataset.id}>
                  {dataset.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {selectedDataset && (
            <TableContainer>
              <Typography variant="h6" gutterBottom>
                Available Analyses
              </Typography>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Analysis ID</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {analyses.map((analysis) => (
                    <TableRow
                      key={analysis.id}
                      hover
                      onClick={() => handleAnalysisSelect(analysis.id)}
                      className="cursor-pointer"
                      selected={selectedAnalysis === analysis.id}
                    >
                      <TableCell>{analysis.id}</TableCell>
                      <TableCell>{analysis.name}</TableCell>
                      <TableCell>{analysis.status}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </div>
      </Paper>

      {results && (
        <Paper className="p-6">
          <Typography variant="h6" gutterBottom>
            EDA Results
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            {results.summary}
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Records Processed</TableCell>
                  <TableCell>Errors</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>{results.details.recordsProcessed}</TableCell>
                  <TableCell>{results.details.errors}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      )}
    </div>
  );
};

export default Analysis;