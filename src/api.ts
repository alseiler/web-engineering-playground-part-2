// api.ts

interface ImageInfo {
  url: string;
  [key: string]: unknown;
}

interface Page {
  imageinfo: ImageInfo[];
  [key: string]: unknown;
}

interface QueryResult {
  query: {
    pages: Record<string, Page>;
  };
}

export const fetchImageUrl = async (fileName: string): Promise<string> => {
  const baseUrl = 'https://en.wikipedia.org/w/api.php';
  const imageParams = {
    action: 'query',
    titles: `File:${fileName}`,
    prop: 'imageinfo',
    iiprop: 'url',
    format: 'json',
    origin: '*',
  };

  const url = `${baseUrl}?${new URLSearchParams(imageParams).toString()}`;

  try {
    const res = await fetch(url);
    const data: QueryResult = await res.json();
    const pages = data.query.pages;
    const firstPage = Object.values(pages)[0];
    const imageUrl = firstPage.imageinfo[0].url;
    return imageUrl;
  } catch (error) {
    console.error('Error fetching image URL: ', error);
    return 'placeholder-panda.jpg';
  }
};
