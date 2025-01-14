import axios from 'axios';

interface Bear {
  name: string;
  binomial: string;
  image: string;
  range: string;
}

// Export fetchImageUrl function
export async function fetchImageUrl(fileName: string): Promise<string> {
  const baseUrl = 'https://en.wikipedia.org/w/api.php';
  const params = {
    action: 'query',
    titles: `File:${fileName}`,
    prop: 'imageinfo',
    iiprop: 'url',
    format: 'json',
    origin: '*',
  };

  const url = `${baseUrl}?${new URLSearchParams(params).toString()}`;
  const response = await axios.get(url);

  const pages = response.data.query.pages as Record<
    string,
    { imageinfo?: Array<{ url: string }> }
  >;
  const page = Object.values(pages)[0];

  if (page.imageinfo != null && page.imageinfo.length > 0) {
    return page.imageinfo[0].url;
  } else {
    throw new Error(`Image not found for file: ${fileName}`);
  }
}

// Function to extract bears from wikitext
export const fetchBears = async (): Promise<Bear[]> => {
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
  const response = await axios.get(url);
  const wikitext: string = response.data.parse.wikitext['*'];

  const speciesTables = wikitext.split('{{Species table/end}}');
  const bears: Bear[] = [];

  for (const table of speciesTables) {
    const rows = table.split('{{Species table/row');
    for (const row of rows) {
      const nameMatch = row.match(/\|name=\[\[(.*?)\]\]/);
      const binomialMatch = row.match(/\|binomial=(.*?)\n/);
      const imageMatch = row.match(/\|image=(.*?)\|/); // Extract file name
      const rangeMatch = row.match(/\|range=([^|(]*)/);

      if (nameMatch != null && binomialMatch != null && imageMatch != null) {
        const fileName = imageMatch[1].trim().replace('File:', ''); // Clean up file name

        try {
          const imageUrl = await fetchImageUrl(fileName); // Fetch the actual image URL
          const bear: Bear = {
            name: nameMatch[1],
            binomial: binomialMatch[1],
            image: imageUrl,
            range: rangeMatch != null ? rangeMatch[1].trim() : 'Unknown',
          };
          bears.push(bear);
        } catch (error) {
          console.error(`Error fetching image URL for ${fileName}:`, error);
        }
      }
    }
  }

  return bears;
};
