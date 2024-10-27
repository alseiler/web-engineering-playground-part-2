// bears.ts
import { fetchImageUrl } from './api';

interface Bear {
  name: string;
  binomial: string;
  image: string;
  range: string;
}

export async function extractBears(wikitext: string): Promise<void> {
  const speciesTables = wikitext.split('{{Species table/end}}');
  const bears: Bear[] = [];

  for (const table of speciesTables) {
    const rows = table.split('{{Species table/row');
    for (const row of rows) {
      const nameMatch = row.match(/\|name=\[\[(.*?)\]\]/);
      const binomialMatch = row.match(/\|binomial=(.*?)\n/);
      const imageMatch = row.match(/\|image=(.*?)\n/);
      const rangeMatch = row.match(/\|range=([^|(]*)/);

      if (nameMatch != null && binomialMatch != null && imageMatch != null) {
        const fileName = imageMatch[1].trim().replace('File:', '');

        try {
          const imageUrl = await fetchImageUrl(fileName);
          const bear: Bear = {
            name: nameMatch[1],
            binomial: binomialMatch[1],
            image: imageUrl,
            range: rangeMatch != null ? rangeMatch[1].trim() : 'Unknown',
          };
          bears.push(bear);
        } catch (error) {
          console.error('Error fetching bear details: ', error);
        }
      }
    }
  }

  // Update UI after processing all bears
  const moreBearsSection = document.querySelector('.more_bears');

  if (moreBearsSection != null) {
    bears.forEach((bear) => {
      const bearDiv = document.createElement('div');

      const bearTitle = document.createElement('h3');
      bearTitle.textContent = `${bear.name} (${bear.binomial})`;

      const bearImg = document.createElement('img');
      bearImg.src = bear.image;
      bearImg.alt = `${bear.name}`;
      bearImg.style.width = '200px';

      const bearRange = document.createElement('p');
      bearRange.innerHTML = `<strong>Range:</strong> ${bear.range}`;

      bearDiv.appendChild(bearTitle);
      bearDiv.appendChild(bearImg);
      bearDiv.appendChild(bearRange);

      moreBearsSection.appendChild(bearDiv);
    });
  } else {
    console.error('Error: .more_bears element not found in the DOM.');
  }
}

interface WikitextData {
  parse: {
    wikitext: {
      '*': string;
    };
  };
}

export async function getBearData(): Promise<void> {
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

  try {
    const res = await fetch(url);
    const data: WikitextData = await res.json();
    const wikitext = data.parse.wikitext['*'];
    void extractBears(wikitext);
  } catch (error) {
    console.error('Error fetching bear data: ', error);
  }
}
