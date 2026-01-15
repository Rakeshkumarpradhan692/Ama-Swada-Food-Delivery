import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/common/Card';
import { useTheme } from '../../context/ThemeContext';

const ChartWidget = ({ title, options, series, type = "line", height = 350 }) => {
  const { theme } = useTheme();
  
  const defaultOptions = {
    chart: {
      background: 'transparent',
      toolbar: { show: false },
      ...options?.chart,
    },
    theme: {
      mode: theme === 'dark' ? 'dark' : 'light',
    },
    dataLabels: { enabled: false },
    stroke: { curve: 'smooth' },
    grid: {
      borderColor: theme === 'dark' ? '#334155' : '#e2e8f0', // slate-700 vs slate-200
    },
    xaxis: {
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: {
        style: {
          colors: theme === 'dark' ? '#94a3b8' : '#64748b',
        }
      }
    },
    yaxis: {
      labels: {
        style: {
          colors: theme === 'dark' ? '#94a3b8' : '#64748b',
        }
      }
    },
    colors: ['#3b82f6', '#10b981', '#f59e0b'], // primary colors
    ...options,
  };

  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="pl-2">
        <ReactApexChart 
          options={defaultOptions} 
          series={series} 
          type={type} 
          height={height} 
        />
      </CardContent>
    </Card>
  );
};

export default ChartWidget;
