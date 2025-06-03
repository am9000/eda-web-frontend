import React from 'react';
import { Grid, Typography, Paper, Box, useTheme } from '@mui/material';
import { Users, ShoppingCart, DollarSign, TrendingUp } from 'lucide-react';
import DashboardCard from '../components/DashboardCard';
import SampleForm from '../components/SampleForm';

const Dashboard = () => {
  const theme = useTheme();
  
  const cardData = [
    { title: 'Total Users', value: '2,543', icon: <Users size={24} />, color: '#1976d2' },
    { title: 'Sales', value: '$12,500', icon: <ShoppingCart size={24} />, color: '#9c27b0' },
    { title: 'Revenue', value: '$48,265', icon: <DollarSign size={24} />, color: '#009688' },
    { title: 'Growth', value: '+12.5%', icon: <TrendingUp size={24} />, color: '#4caf50' },
  ];

  return (
    <div className="p-6">
      <Typography variant="h4" component="h1" gutterBottom className="font-bold">
        Dashboard
      </Typography>
      
      <Grid container spacing={3} className="mb-6">
        {cardData.map((card, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <DashboardCard
              title={card.title}
              value={card.value}
              icon={card.icon}
              color={card.color}
            />
          </Grid>
        ))}
      </Grid>
      
      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <Paper 
            className="p-4 h-full"
            sx={{ 
              borderRadius: '16px',
              border: `1px solid ${theme.palette.divider}`,
            }}
          >
            <Typography variant="h6" gutterBottom>
              Recent Activity
            </Typography>
            <Box className="flex flex-col space-y-4">
              {[1, 2, 3, 4].map((item) => (
                <Box 
                  key={item}
                  className="p-3 rounded-lg transition-colors duration-200"
                  sx={{ 
                    bgcolor: theme.palette.action.hover,
                    '&:hover': {
                      bgcolor: theme.palette.action.selected,
                    }
                  }}
                >
                  <div className="flex justify-between">
                    <Typography variant="body1">Activity Item {item}</Typography>
                    <Typography variant="caption" color="textSecondary">
                      {new Date().toLocaleDateString()}
                    </Typography>
                  </div>
                  <Typography variant="body2" color="textSecondary" className="mt-1">
                    This is a sample activity description. Replace with real data in your application.
                  </Typography>
                </Box>
              ))}
            </Box>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <SampleForm />
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;