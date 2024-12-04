import { ChartConfiguration } from 'chart.js/auto';

export const chartConfigMostDamagedStocks: ChartConfiguration = {
  type: 'doughnut',
  data: {
    labels: [
      'HAZARDOUS MATERIALS',
      'NON-PERISHABLES',
      'PERISHABLES',
      'FINISHED GOODS',
      'SORTING AREA',
    ],
    datasets: [
      {
        data: [1, 15, 30, 7, 3],
        borderWidth: 1,
        backgroundColor: [
          '#4472C4',
          '#ED7D31',
          '#FF0000',
          '#FFC000',
          '#5B9BD5',
        ],
      },
    ],
  },
  options: {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'MOST DAMAGED STOCKS',
        font: {
          size: 15, // Adjusts the font size of the title
        },
      },
      legend: {
        position: 'bottom', // Moves the legend to the bottom
        labels: {
          font: {
            size: 12, // Adjusts the font size of the legend
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
  },
};
