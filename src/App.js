import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';
import Filters from './Components/Filters';
import LineChart from './Components/LineChart';
import PieChart from './Components/PieChart';
import BarChart from './Components/BarChart';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  BarElement,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  BarElement
);

const App = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filters, setFilters] = useState({
    selectedYear: '2019',
    selectedRegion: 'Monroe',
    selectedModelType: 'Plug-in Hybrid Electric Vehicle (PHEV)',
    selectedPopRange: 1000000000000000,
    selectedModel:"RAV4 PRIME"
  });

  useEffect(() => {
    fetch('https://Akanksha360.github.io/Project/data.csv')
      .then((response) => response.text()) 
      .then((csvText) => {
        Papa.parse(csvText, {
          header: true,
          dynamicTyping: true,
          skipEmptyLines: true,
          complete: (result) => {
            console.log("Parsed Data:", result.data);
            setData(result.data); 
          },
        });
      })
  }, []);

  useEffect(() => {
    console.log("Filters changed:", filters);
    const filteredData = data.filter((item) => {
      return (
        item["Electric Vehicle Type"] == filters.selectedModelType && (
        item["Model Year"] == filters.selectedYear ||
        item["County"] === filters.selectedRegion  ||
        item["2020 Census Tract"] <= filters.selectedPopRange)||
        item["Model"]==filters.selectedModel 
      );
    });

    console.log("filetre",filteredData)
    setFilteredData([...filteredData]); 
  }, [filters, data]); 

  return (
    <div className="mx-auto flex flex-col m-auto gap-24 p-4 w-full">
      <Filters filters={filters} setFilters={setFilters} data={data}/>
      <div className="flex m-auto flex-row nowrap gap-24 w-[80%]">
        <div className="w-[70%]">
          <h2 className="text-xl font-medium mb-2">EV Population Growth</h2>
          <LineChart data={filteredData} />
        </div>

        <div className="w-[60%]">
          <h2 className="text-xl font-medium mb-2">EV Population by Country</h2>
          <PieChart data={filteredData} />
        </div>

        <div className="w-[60%]">
          <h2 className="text-xl font-medium mb-2">Top EV Models</h2>
          <BarChart data={filteredData} />
        </div>
      </div>
    </div>
  );
};

export default App;
