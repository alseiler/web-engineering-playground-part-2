// src/Bears.tsx
import React, { useEffect, useState } from 'react';
import { fetchBears, type Bear } from './api';

function Bears(): React.JSX.Element {
  const [bears, setBears] = useState<Bear[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getBears = async (): Promise<void> => {
      try {
        const fetchedBears = await fetchBears();
        setBears(fetchedBears);
      } catch (error) {
        console.error('Error fetching bear data: ', error);
      } finally {
        setLoading(false);
      }
    };

    void getBears();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h3>More Bears</h3>
      {bears.length === 0 ? (
        <p>No bears available.</p>
      ) : (
        bears.map((bear, index) => (
          <div key={index}>
            <h3>
              {bear.name} ({bear.binomial})
            </h3>
            <img src={bear.image} alt={bear.name} width="200" />
            <p>
              <strong>Range:</strong> {bear.range}
            </p>
          </div>
        ))
      )}
    </div>
  );
}

export default Bears;
