import React, { useState } from 'react';
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
  TableSortLabel,
  Chip,
  Box,
} from '@mui/material';

// Mock data - replace with actual API calls
const mockDatasets = ['Dataset A', 'Dataset B', 'Dataset C'];
const mockAnalyses = [
  { id: 1, date: '2024-02-28', status: 'Completed' },
  { id: 2, date: '2024-02-27', status: 'Completed' },
];

type Result = {
  rowNumber: number;
  importance: 'CRITICAL' | 'HIGH' | 'NORMAL' | 'LOW';
  description: string;
};

const mockResults: Result[] = [
  {
    rowNumber: 1,
    importance: 'CRITICAL',
    description: 'Missing values detected in key columns',
  },
  {
    rowNumber: 2,
    importance: 'HIGH',
    description: 'Outliers found in numerical columns',
  },
  {
    rowNumber: 3,
    importance: 'NORMAL',
    description: 'Data distribution appears normal',
  },
  {
    rowNumber: 4,
    importance: 'LOW',
    description: 'Minor data quality issues detected',
  },
];

type Order = 'asc' | 'desc';

const Analysis = () => {
  const [selectedDataset, setSelectedDataset] = useState('');
  const [selectedAnalysis, setSelectedAnalysis] = useState<number | null>(null);
  const [results, setResults] = useState<Result[]>([]);
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<keyof Result>('rowNumber');

  const handleDatasetChange = (event: any) => {
    setSelectedDataset(event.target.value);
    setSelectedAnalysis(null);
    setResults([]);
  };

  const handleAnalysisSelect = (analysisId: number) => {
    setSelectedAnalysis(analysisId);
    setResults(mockResults);
  };

  const handleSort = (property: keyof Result) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);

    const sortedResults = [...results].sort((a, b) => {
      const aValue = a[property];
      const bValue = b[property];
      
      if (property === 'importance') {
        const importanceOrder = { CRITICAL: 0, HIGH: 1, NORMAL: 2, LOW: 3 };
        return (isAsc ? 1 : -1) * 
          (importanceOrder[a.importance] - importanceOrder[b.importance]);
      }
      
      return (isAsc ? 1 : -1) * 
        (aValue < bValue ? -1 : aValue > bValue ? 1 : 0);
    });

    setResults(sortedResults);
  };

  const getImportanceChip = (importance: string) => {
    const importanceProps = {
      CRITICAL: { color: 'error' as const, label: 'Critical' },
      HIGH: { color: 'warning' as const, label: 'High' },
      NORMAL: { color: 'info' as const, label: 'Normal' },
      LOW: { color: 'default' as const, label: 'Low' },
    }[importance] || { color: 'default' as const, label: importance };

    return <Chip {...importanceProps} size="small" />;
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
              value={selectedDataset}
              label="Dataset"
              onChange={handleDatasetChange}
            >
              {mockDatasets.map((dataset) => (
                <MenuItem key={dataset} value={dataset}>
                  {dataset}
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
                    <TableCell>Date</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {mockAnalyses.map((analysis) => (
                    <TableRow
                      key={analysis.id}
                      hover
                      onClick={() => handleAnalysisSelect(analysis.id)}
                      className="cursor-pointer"
                      selected={selectedAnalysis === analysis.id}
                    >
                      <TableCell>{analysis.id}</TableCell>
                      <TableCell>{analysis.date}</TableCell>
                      <TableCell>{analysis.status}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </div>
      </Paper>

      {results.length > 0 && (
        <Paper className="p-6">
          <Typography variant="h6" gutterBottom>
            EDA Results
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <TableSortLabel
                      active={orderBy === 'rowNumber'}
                      direction={orderBy === 'rowNumber' ? order : 'asc'}
                      onClick={() => handleSort('rowNumber')}
                    >
                      Row Number
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={orderBy === 'importance'}
                      direction={orderBy === 'importance' ? order : 'asc'}
                      onClick={() => handleSort('importance')}
                    >
                      Importance
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>Description</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {results.map((result) => (
                  <TableRow key={result.rowNumber}>
                    <TableCell>{result.rowNumber}</TableCell>
                    <TableCell>{getImportanceChip(result.importance)}</TableCell>
                    <TableCell>{result.description}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      )}
    </div>
  );
};

export default Analysis;