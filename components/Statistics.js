// src/components/Statistics.js
import React from 'react';
import SpendingByDateChart from './SpendingByDateChart';
import WinnersChart from './WinnersChart';

const Statistics = () => {
  return (
    <div className="container py-5">
      <h2>Estadísticas</h2>
      <div className="my-4">
        <SpendingByDateChart />
      </div>
      <div className="my-4">
        <WinnersChart />
      </div>
    </div>
  );
};

export default Statistics;
