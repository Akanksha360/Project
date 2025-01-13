import React, { useEffect, useState } from 'react';

const Filters = ({ filters, setFilters, data }) => {
  const [filterConfig, setFilterConfig] = useState({
    County: [],
    "Model Year": [],
    "Electric Vehicle Type": [],
    "Model":[]
  });

  useEffect(() => {
    const uniqueValues = (key) => {
      return [...new Set(data.map((item) => item[key]))].filter(Boolean);
    };

    setFilterConfig({
      County: uniqueValues("County"),
      "Model Year": uniqueValues("Model Year"),
      "Electric Vehicle Type": uniqueValues("Electric Vehicle Type"),
      "Model":uniqueValues("Model")
    });
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handlePopRangeChange = (e) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      selectedPopRange: e.target.value,
    }));
  };

  return (
    <div className="my-4 flex gap-12 flex-row bg-lightblue p-4">
      {Object.keys(filterConfig).map((filterKey) => (
        <div key={filterKey}>
          <label htmlFor={filterKey} className="mr-2">
            Select {filterKey.charAt(0).toUpperCase() + filterKey.slice(1)}:
          </label>
          <select
            id={filterKey}
            name={filterKey}
            className="border p-2 rounded"
            value={filters[filterKey]}
            onChange={handleChange}
          >
            {filterConfig[filterKey].map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      ))}

      <div className="items-center flex">
        <label htmlFor="selectedPopRange" className="mr-2 ml-4">
          Select EV Population Range:
        </label>
        <input
          type="range"
          id="selectedPopRange"
          name="selectedPopRange"
          min="0"
          max="50000000000000"
          value={filters.selectedPopRange}
          onChange={handlePopRangeChange}
          className="border p-2 rounded"
        />
        <span>{filters.selectedPopRange}</span>
      </div>
    </div>
  );
};

export default Filters;
