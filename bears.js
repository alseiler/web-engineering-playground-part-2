// bears.js
import { fetchImageUrl } from './api.js';

export async function extractBears(wikitext) {
  const speciesTables = wikitext.split('{{Species table/end}}');
  const bears = [];

  for (const table of speciesTables) {
    const rows = table.split('{{Species table/row');
    for (const row of rows) {
      const nameMatch = row.match(/\|name=\[\[(.*?)\]\]/);
      const binomialMatch = row.match(/\|binomial=(.*?)\n/);
      const imageMatch = row.match(/\|image=(.*?)\n/);
      const rangeMatch = row.match(/\|range=([^|\(]*)/);

      if (nameMatch && binomialMatch && imageMatch) {
        const fileName = imageMatch[1].trim().replace('File:', '');
        
        try {
          const imageUrl = await fetchImageUrl(fileName);
          const bear = {
            name: nameMatch[1],
            binomial: binomialMatch[1],
            image: imageUrl, 
            range: rangeMatch ? rangeMatch[1].trim() : 'Unknown'
          };
          bears.push(bear);
        } catch (error) {
          console.error("Error fetching bear details: ", error);
        }
      }
    }
  }

  // Update UI after processing all bears
  const moreBearsSection = document.querySelector('.more_bears');
  bears.forEach((bear) => {
    moreBearsSection.innerHTML += `
      <div>
        <h3>${bear.name} (${bear.binomial})</h3>
        <img src="${bear.image}" alt="${bear.name}" style="width:200px; height:auto;">
        <p><strong>Range:</strong> ${bear.range}</p>
      </div>
    `;
  });
}

export async function getBearData() {
  const baseUrl = "https://en.wikipedia.org/w/api.php";
  const params = {
    action: "parse",
    page: "List_of_ursids",
    prop: "wikitext",
    section: 3,
    format: "json",
    origin: "*"
  };

  const url = `${baseUrl}?${new URLSearchParams(params).toString()}`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    const wikitext = data.parse.wikitext['*'];
    extractBears(wikitext);
  } catch (error) {
    console.error("Error fetching bear data: ", error);
  }
}
