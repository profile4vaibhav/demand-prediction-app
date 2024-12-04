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
    plugins: {
      title: {
        display: true,
        text: 'MOST DAMAGED STOCKS',
      },
    },
  },
};
