// src/api.ts
export interface Bear {
  name: string;
  binomial: string;
  image: string;
  range: string;
}

export const fetchBears = async (): Promise<Bear[]> => {
  const baseUrl = 'http://localhost:5000/api/bears';

  try {
    const response = await fetch(baseUrl);
    if (!response.ok) {
      throw new Error('Failed to fetch bears');
    }
    const bears = await response.json();
    return bears;
  } catch (error) {
    console.error('Error fetching bears: ', error);
    return [];
  }
};
