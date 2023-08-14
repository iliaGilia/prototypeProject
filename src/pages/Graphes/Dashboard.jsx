import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../Login/AuthContext';
import { Link } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import { CategoryScale, LinearScale, PointElement, Chart,LineController ,LineElement} from 'chart.js';

Chart.register(CategoryScale, LinearScale, PointElement,LineController,LineElement);


const Dashboard = () => {
    const { isLoggedIn, authToken } = useAuth();
  const [budgetData, setBudgetData] = useState([]);
  const [expensesData, setExpensesData] = useState([]);

  useEffect(() => {
    // Fetch budget and expenses data with authentication headers
    axios.get('http://localhost:8000/api/budgets/', {
      headers: {
        Authorization: `Bearer ${authToken}`, // Include the JWT token in the header
      },
    }).then(response => {
      setBudgetData(response.data);
    });

    axios.get('http://localhost:8000/api/expenses/', {
      headers: {
        Authorization: `Bearer ${authToken}`, // Include the JWT token in the header
      },
    }).then(response => {
      setExpensesData(response.data);
    });
  }, [authToken]);

  // Process data and create chart datasets

  const budgetLabels = budgetData.map(item => item.name);
  const budgetAmounts = budgetData.map(item => item.amount);
  const budgetChartData = {
    labels: budgetLabels,
    datasets: [
      {
        label: 'Budget Amount',
        data: budgetAmounts,
        borderColor: 'blue',
        fill: false,
      },
    ],
  };

  const expensesLabels = expensesData.map(item => item.category);
  const expensesAmounts = expensesData.map(item => item.amount);
  const expensesChartData = {
    labels: expensesLabels,
    datasets: [
      {
        label: 'Expense Amount',
        data: expensesAmounts,
        borderColor: 'red',
        fill: false,
      },
    ],
  };

  const budgetChartOptions = {};
  const expensesChartOptions = {};

  return (
    <div>
      <nav>
        {isLoggedIn ? (
          <Link to="/dashboard">Dashboard</Link>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </nav>
      <h2>Budget</h2>
      <Line data={budgetChartData} options={budgetChartOptions} />

      <h2>Expenses</h2>
      <Line data={expensesChartData} options={expensesChartOptions} />
    </div>
  );
};

export default Dashboard;
