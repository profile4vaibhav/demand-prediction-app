import { ChartConfiguration } from 'chart.js/auto';

export const chartConfigTopPrediction: ChartConfiguration = {
  type: 'bar',
  data: {
    labels: ['SOFTDRINK', 'BEER', 'WINE', 'TOOTHPASTE', 'SOAP'],
    datasets: [
      {
        label: 'Current Inventory',
        data: [100, 124, 50, 200, 20],
        borderWidth: 1,
        backgroundColor: '#FF7F27',
      },
      {
        label: 'Inventory Prediction',
        data: [200, 180, 120, 300, 250],
        borderWidth: 1,
        backgroundColor: '#4472C3',
      },
      {
        label: 'Suggested Quantity To Reorder',
        data: [100, 56, 70, 100, 230],
        borderWidth: 1,
        backgroundColor: '#5B8E39',
      },
    ],
  },
  options: {
    responsive: true,
    scales: {
      x: {
        ticks: {
          font: {
            size: 12, // Decrease the font size of the x-axis labels
          },
        },
      },
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      title: {
        display: true,
        text: 'TOP PREDICTED STOCKS',
        font: {
          size: 15,
          family: 'Arial, sans-serif',
        }
      },
      legend: {
        position: 'bottom',
        align: 'center',
        labels: {
          font: {
            size: 14,
          },
        },
      },
    },
    layout: {
      padding: {
        left: 10,
        right: 50,
        bottom: 30,
      },
    },
  },
};
