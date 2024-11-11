"use client"

import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Slider } from '@mui/material';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const EntropyGraph: React.FC = () => {
  const [n, setN] = useState(50);

  const calculateEntropy = (p1: number): number => {
    const p2 = 1 - p1;
    if (p1 === 0 || p1 === 1) return 0;
    return -(p1 * Math.log2(p1) + p2 * Math.log2(p2));
  };

  const xValues = Array.from({ length: n }, (_, i) => i / (n - 1));
  const entropyValues = xValues.map(calculateEntropy);

  const data = {
    labels: xValues.map(x => x.toFixed(2)),
    datasets: [
      {
        label: 'Binary Entropy H(p) = -p₁log₂(p₁) - p₂log₂(p₂)',
        data: entropyValues,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' as const },
      title: { display: true, text: 'Binary Entropy Function H(p)' },
    },
    scales: {
      x: { 
        title: { display: true, text: 'Probability p₁ (where p₂ = 1 - p₁)' },
        min: 0,
        max: 1
      },
      y: { 
        title: { display: true, text: 'Entropy H(p) in bits' },
        min: 0,
        max: 1
      },
    },
  };

  return (
    <div style={{ width: '80%', margin: 'auto' }}>
      <Line data={data} options={options} />
      <div style={{ marginTop: 20 }}>
        <Slider
          value={n}
          min={10}
          max={100}
          step={1}
          onChange={(e, newValue) => setN(newValue as number)}
          valueLabelDisplay="auto"
          aria-labelledby="n-slider"
        />
        <p>Adjust number of points (n): {n}</p>
      </div>
    </div>
  );
};

export default EntropyGraph;
