import React from 'react';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from './theme/ThemeContext';
import MainLayout from './layout/MainLayout';
import Dashboard from './pages/Dashboard';
import Parameters from './pages/Parameters';
import Status from './pages/Status';
import Analysis from './pages/Analysis';
import Users from './pages/Users';
import Settings from './pages/Settings';
import Help from './pages/Help';

function App() {
  const [currentPage, setCurrentPage] = React.useState('parameters');

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'parameters':
        return <Parameters />;
      case 'status':
        return <Status />;
      case 'analysis':
        return <Analysis />;
      case 'users':
        return <Users />;
      case 'settings':
        return <Settings />;
      case 'help':
        return <Help />;
      default:
        return <Parameters />;
    }
  };

  return (
    <ThemeProvider>
      <CssBaseline />
      <MainLayout onPageChange={setCurrentPage}>
        {renderPage()}
      </MainLayout>
    </ThemeProvider>
  );
}

export default App;