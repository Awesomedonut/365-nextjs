// app/page.tsx
import React from 'react';
import EntropyGraph from './components/EntrophyGraph';

const Home: React.FC = () => {
  return (
    <div>
      <h1>Entropy Graph</h1>
      <p>Adjust the number of points (n) to see how the entropy function changes.</p>
      <EntropyGraph />
    </div>
  );
};

export default Home;
