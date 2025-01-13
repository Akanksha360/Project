import React from 'react';
import { Line } from 'react-chartjs-2';

const LineChart = ({ data }) => {
  console.log(data,"data")
  const lineChartData = {
    labels: data.length > 0 ? data.map((item) => item["Model Year"]) : [],
    datasets: [
      {
        label: 'EV Population Over Time',
        data: data.length > 0 ? data.map((item) => item["2020 Census Tract"]) : [],
        borderColor: '#4caf50',
        fill: false,
      },
    ],
  };

  return <Line data={lineChartData} />;
};

export default LineChart;
