import { ChartConfiguration } from 'chart.js/auto';

export const chartConfigOverstockSummary: ChartConfiguration = {
  type: 'bar',
  data: {
    labels: ['PULSE', 'YOGHURT', 'PASTA', 'TOOTHBRUSH', 'T-SHIRT'],
    datasets: [
      {
        label: 'Current Inventory',
        data: [200, 180, 120, 300, 250],
        borderWidth: 1,
        backgroundColor: '#FF7F27',
      },
      {
        label: 'Expected Inventory',
        data: [100, 124, 50, 200, 20],
        borderWidth: 1,
        backgroundColor: '#4472C3',
      },
      {
        label: 'Over Inventory',
        data: [100, 56, 70, 100, 230],
        borderWidth: 1,
        backgroundColor: '#A5A5A5',
      },
    ],
  },
  options: {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      title: {
        display: true,
        text: 'OVERSTOCK SUMMARY VIEW',
      },
    },
    layout: {
      padding: {
        right: 20,
      },
    },
  },
};
