// src/components/VisualData.js

import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const VisualData = ({ transactions = [] }) => {
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    if (transactions.length === 0) {
      setChartData({
        labels: ['No data available'],
        datasets: [
          {
            label: 'No data',
            data: [1],
            backgroundColor: ['#d3d3d3'],
          },
        ],
      });
      return;
    }

    const moneyIn = transactions
      .filter((tx) => tx.transactionType === 'incoming')
      .reduce((sum, tx) => sum + tx.amount, 0);

    const moneyOut = transactions
      .filter((tx) => tx.transactionType === 'outgoing')
      .reduce((sum, tx) => sum + tx.amount, 0);

    setChartData({
      labels: ['Money In', 'Money Out'],
      datasets: [
        {
          label: 'In vs Out',
          data: [moneyIn, moneyOut],
          backgroundColor: ['#00FF00', '#FF0000'],
        },
      ],
    });
  }, [transactions]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          color: 'white',
        },
      },
      tooltip: {
        enabled: true,
      },
    },
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold text-center mb-4">Visual Data</h2>
      {transactions.length > 0 ? (
        <Pie data={chartData} options={options} />
      ) : (
        <p className="text-center text-gray-400">No transaction data available to display.</p>
      )}
    </div>
  );
};

export default VisualData;
