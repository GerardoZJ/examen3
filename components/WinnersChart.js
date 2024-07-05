// src/components/WinnersChart.js
import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { collection, getDocs } from 'firebase/firestore';
import { firestoreApp } from '../config/firebase';
import 'chart.js/auto';

const WinnersChart = () => {
  const [chartData, setChartData] = useState(null);  // Cambiar el estado inicial a null

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(firestoreApp, 'auctionWinners'));
      const data = querySnapshot.docs.map(doc => doc.data());

      const winners = data.map(entry => entry.winner || "Unknown Winner");
      const wins = winners.reduce((acc, winner) => {
        acc[winner] = (acc[winner] || 0) + 1;
        return acc;
      }, {});

      if (isMounted) {
        setChartData({
          labels: Object.keys(wins),
          datasets: [
            {
              label: 'Ganadores de Subastas',
              data: Object.values(wins),
              backgroundColor: 'rgba(153, 102, 255, 0.6)',
              borderColor: 'rgba(153, 102, 255, 1)',
              borderWidth: 1,
            },
          ],
        });
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  if (!chartData) {
    return <div>Loading...</div>;  // Mostrar un mensaje de carga mientras se obtienen los datos
  }

  return (
    <div>
      <h2>Ganadores de Subastas</h2>
      <Bar data={chartData} />
    </div>
  );
};

export default WinnersChart;
