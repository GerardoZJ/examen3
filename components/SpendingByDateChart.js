// src/components/SpendingByDateChart.js
import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { collection, getDocs } from 'firebase/firestore';
import { firestoreApp } from '../config/firebase';
import 'chart.js/auto';

const SpendingByDateChart = () => {
  const [chartData, setChartData] = useState(null);  // Cambiar el estado inicial a null

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(firestoreApp, 'auctions'));
      const data = querySnapshot.docs.map(doc => doc.data());

      const dates = data.map(entry => {
        if (entry.createdAt && entry.createdAt.seconds) {
          return new Date(entry.createdAt.seconds * 1000).toLocaleDateString();
        }
        return "Unknown Date";
      });

      const spendings = data.map(entry => entry.curPrice || 0);

      if (isMounted) {
        setChartData({
          labels: dates,
          datasets: [
            {
              label: 'Gasto por Fecha',
              data: spendings,
              backgroundColor: 'rgba(75, 192, 192, 0.6)',
              borderColor: 'rgba(75, 192, 192, 1)',
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
      <h2>Gasto por Fecha</h2>
      <Line data={chartData} />
    </div>
  );
};

export default SpendingByDateChart;
