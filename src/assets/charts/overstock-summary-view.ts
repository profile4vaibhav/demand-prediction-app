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
    responsive: true,
    scales: {
      x: {
        ticks: {
          font: {
            size: 12, // Decreases font size for x-axis labels
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
        text: 'OVERSTOCK SUMMARY VIEW',
        font: {
          size: 15,
          family: 'Arial, sans-serif',
        }
      },
      legend: {
        position: 'bottom', // Moves the legend to the bottom
        labels: {
          font: {
            size: 14, // Adjusts the font size of the legend
          },
        },
      },
      tooltip: {
        // Customizing the tooltip font
        bodyFont: {
          size: 12,  // Adjust the font size for the body of the tooltip
          weight: 'normal',  // You can set this to 'bold' or 'normal'
          family: 'Arial, sans-serif',  // Font family
        },
        titleFont: {
          size: 14,  // Adjust the font size for the title of the tooltip
          weight: 'bold',  // Tooltip title font weight
          family: 'Arial, sans-serif',  // Font family
        },
        footerFont: {
          size: 12,  // Adjust the font size for the footer of the tooltip (if any)
          weight: 'normal',
          family: 'Arial, sans-serif',
        },
      },
    },
    layout: {
      padding: {
        right: 20,
      },
    },
  },
};
