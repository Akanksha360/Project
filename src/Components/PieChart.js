import React from 'react';
import { Pie } from 'react-chartjs-2';

const PieChart = ({ data }) => {
  
  const regionCounts = data.reduce((acc, item) => {
    const region = item["County"]; 
    if (region) {
      acc[region] = (acc[region] || 0) + item["2020 Census Tract"]; 
    }
    return acc;
  }, {});

  const labels = Object.keys(regionCounts);
  const populationData = Object.values(regionCounts);
  const colors = ['#ffcc00', '#ff6347', '#4caf50', '#2196f3', '#9c27b0', '#3f51b5',"#3c51e5"]; 

  const pieChartData = {
    labels: labels,
    datasets: [
      {
        label: 'EV Population by Region',
        data: populationData,
        backgroundColor: colors.slice(0, labels.length), 
      },
    ],
  };

  return <Pie data={pieChartData} />;
};

export default PieChart;
