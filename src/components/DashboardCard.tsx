import React, { ReactNode } from 'react';
import { Card, CardContent, Typography, useTheme } from '@mui/material';

type DashboardCardProps = {
  title: string;
  value: string | number;
  icon: ReactNode;
  color?: string;
};

const DashboardCard = ({ title, value, icon, color }: DashboardCardProps) => {
  const theme = useTheme();
  
  return (
    <Card 
      className="transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
      sx={{ 
        height: '100%',
        border: `1px solid ${theme.palette.divider}`,
      }}
    >
      <CardContent className="flex flex-col h-full">
        <div className="flex justify-between items-start mb-4">
          <Typography variant="subtitle2" color="textSecondary" gutterBottom>
            {title}
          </Typography>
          <div style={{ color: color || theme.palette.primary.main }}>
            {icon}
          </div>
        </div>
        <Typography variant="h4" component="div" className="mt-auto font-bold">
          {value}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default DashboardCard;