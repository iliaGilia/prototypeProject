import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../Login/AuthContext';
import { Link } from 'react-router-dom';
import CanvasJSReact from '@canvasjs/react-charts';

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const Dashboard = () => {
  const { isLoggedIn, authToken } = useAuth();
  const [expensesData, setExpensesData] = useState([]);
  const [newChart, setNewChart] = useState({
    title: '',
    dataPoints: [
      { y: 0, label: 'Category 1' },
      { y: 0, label: 'Category 2' },
      { y: 0, label: 'Category 3' },
    ],
  });
  const [categories, setCategories] = useState(
    newChart.dataPoints.map((category) => ({
      name: category.label,
      value: 0,
      percentage: 0,
      color: getRandomColor(),
    }))
  );

  const addCategory = () => {
    const newCategory = {
      name: `Category ${categories.length + 1}`,
      value: 0,
      percentage: 0,
      color: getRandomColor(),
    };
    setCategories([...categories, newCategory]);
  };

  const updateCategoryName = (index, newName) => {
    const updatedCategories = [...categories];
    updatedCategories[index].name = newName;
    setCategories(updatedCategories);
  };

  const updateCategoryValue = (index, newValue) => {
    const updatedCategories = [...categories];
    updatedCategories[index].value = newValue;
    setCategories(updatedCategories);
  };

  const createChart = () => {
    // Convert categories state into the format expected by the server
    const chartData = {
      title: newChart.title,
      dataPoints: categories.map((category) => ({
        y: category.value,
        label: category.name,
      })),
      
    };

    // Send a POST request to create a new chart
    axios
      .post('http://localhost:8000/api/charts/', chartData, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((response) => {
        // Handle the response if needed
        console.log('Chart created successfully:', response.data);

        // Fetch the updated expenses data or perform any necessary actions
        // ...

        // Clear the new chart form if needed
        setNewChart({
          title: '',
          dataPoints: categories.map((category) => ({
            y: 0,
            label: category.name,
          })),
        });
      })
      .catch((error) => {
        console.error('Error creating chart:', error);
      });
      console.log(chartData)
      
  };

  useEffect(() => {
    // Calculate percentages in real-time as the user inputs values
    const totalValue = categories.reduce((total, category) => total + category.value, 0);
    const updatedCategories = categories.map((category) => ({
      ...category,
      percentage: totalValue === 0 ? 0 : (category.value / totalValue) * 100,
    }));
    setCategories(updatedCategories);
  }, [categories]);

  const pieChartOptions = {
    exportEnabled: true,
    animationEnabled: true,
    title: {
      text: "Creating new chart"
    },
    data: [{
      type: "pie",
      startAngle: 75,
      toolTipContent: "<b>{label}</b>: {y}₪",
      showInLegend: "true",
      legendText: "{label}",
      indexLabelFontSize: 16,
      indexLabel: "{label} - {y}₪",
      dataPoints: categories.map((category) => ({
        y: category.value,
        label: category.name,
        color: category.color, // Set category-specific color
      })),
    }],
  };

  function getRandomColor() {
    // Generate a random color in hexadecimal format
    return "#" + Math.floor(Math.random() * 16777215).toString(16);
  }

  return (
    <div>
      <h2>Budget</h2>
      <CanvasJSChart options={pieChartOptions} />
      <h2>Create a New Chart</h2>
      <input
        type="text"
        placeholder="Chart Title"
        value={newChart.title}
        onChange={(e) =>
          setNewChart({
            ...newChart,
            title: e.target.value,
          })
        }
      />
      {categories.map((category, index) => (
        <div key={index}>
          <input
            type="text"
            placeholder={`Category ${index + 1}`}
            value={category.name}
            onChange={(e) => updateCategoryName(index, e.target.value)}
          />
          <input
            type="number"
            placeholder={`Value for ${category.name}`}
            value={category.value}
            onChange={(e) => updateCategoryValue(index, parseFloat(e.target.value))}
          />
        </div>
      ))}
      <button onClick={addCategory}>Add Category</button>
      <button onClick={createChart}>Create Chart</button>
    </div>
  );
};

export default Dashboard;
