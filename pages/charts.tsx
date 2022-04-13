import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Monthly spending record',
    },
  },
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
    },
  },
};


const labels = ["Week1", "Week2", "Week3", "Week4"];


export const data = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: { Week1: 200, Week2: 300, Week3: 400, Week4: 400 },
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Dataset 2',
      data: { Week1: 200, Week2: 300, Week3: 400, Week4: 400 },
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};

export default function Charts() {
  return <Bar options={options} data={data} />;
}
