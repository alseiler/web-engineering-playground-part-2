// src/Bears.tsx

import React, { useEffect, useState } from 'react';
import { fetchImageUrl } from './api';

interface Bear {
  name: string;
  binomial: string;
  image: string;
  range: string;
}

function Bears(): React.JSX.Element {
  const [bears, setBears] = useState<Bear[]>([]);

  // Use a side effect to fetch data from Wikipedia
  useEffect(() => {
    async function getBearData(): Promise<void> {
      try {
        // same code you had in getBearData() for fetching the wikitext
        const baseUrl = 'https://en.wikipedia.org/w/api.php';
        const params = {
          action: 'parse',
          page: 'List_of_ursids',
          prop: 'wikitext',
          section: '3',
          format: 'json',
          origin: '*',
        };
        const url = `${baseUrl}?${new URLSearchParams(params).toString()}`;

        const res = await fetch(url);
        const data = await res.json();

        // now we parse bears from wikitext
        const wikitext: unknown = data.parse.wikitext['*'];
        if (typeof wikitext !== 'string') {
          throw new Error('Response wikitext is not a string');
        } else {
          await extractBears(wikitext);
        }
      } catch (error) {
        console.error('Error fetching bear data: ', error);
      }
    }

    async function extractBears(wikitext: string): Promise<void> {
      const speciesTables = wikitext.split('{{Species table/end}}');
      const newBears: Bear[] = [];

      for (const table of speciesTables) {
        const rows = table.split('{{Species table/row');
        for (const row of rows) {
          const nameMatch = row.match(/\|name=\[\[(.*?)\]\]/);
          const binomialMatch = row.match(/\|binomial=(.*?)\n/);
          const imageMatch = row.match(/\|image=(.*?)\n/);
          const rangeMatch = row.match(/\|range=([^|(]*)/);

          if (
            nameMatch != null &&
            binomialMatch != null &&
            imageMatch != null
          ) {
            const fileName = imageMatch[1].trim().replace('File:', '');
            try {
              const imageUrl = await fetchImageUrl(fileName);
              const bear: Bear = {
                name: nameMatch[1],
                binomial: binomialMatch[1],
                image: imageUrl,
                range: rangeMatch != null ? rangeMatch[1].trim() : 'Unknown',
              };
              newBears.push(bear);
            } catch (error) {
              console.error('Error fetching bear details: ', error);
            }
          }
        }
      }
      setBears(newBears);
    }

    // Kick off the fetch
    void getBearData();
  }, []);

  // Render the bears
  return (
    <div>
      <h3>More Bears</h3>
      {bears.map((bear, index) => (
        <div key={index}>
          <h3>
            {bear.name} ({bear.binomial})
          </h3>
          <img src={bear.image} alt={bear.name} width="200" />
          <p>
            <strong>Range:</strong> {bear.range}
          </p>
        </div>
      ))}
    </div>
  );
}

export default Bears;
