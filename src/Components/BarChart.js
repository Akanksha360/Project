import React from 'react';
import { Bar } from 'react-chartjs-2';

const BarChart = ({ data }) => {
  const barChartData = {
    labels: data.length > 0 ? data.map((item) => item["Model"]) : [],
    datasets: [
      {
        label: 'Top EV Models',
        data: data.length > 0 ? data.map((item) => item["2020 Census Tract"]) : [],
        backgroundColor: '#2196f3',
      },
    ],
  };

  return <Bar data={barChartData} />;
};

export default BarChart;
