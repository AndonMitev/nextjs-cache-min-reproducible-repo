import { ApiBaseUrl } from '@/constants';

enum TrendsEndpoints {
  GetTopTrends = 'trends/top',
  GetTrendsPrices = 'trends/prices'
}

export const getTopTrends = async () => {
  const { signal } = new AbortController();

  const response = await fetch(
    `https://whale-app-fxqzs.ondigitalocean.app/${TrendsEndpoints.GetTopTrends}`,
    {
      signal,
      next: {
        revalidate: 0
      }
    }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch top trends');
  }

  return await response.json();
};

export const getTrendsPrices = async (data: { trends: string[] }) => {
  const { signal } = new AbortController();

  const body = JSON.stringify({
    trends: data.trends,
    amounts: new Array(data.trends.length).fill('1'),
    types: new Array(data.trends.length).fill('BUY')
  });

  const response = await fetch(
    `https://whale-app-fxqzs.ondigitalocean.app/${TrendsEndpoints.GetTrendsPrices}`,
    {
      method: 'POST',
      body,
      headers: {
        'Content-Type': 'application/json'
      },
      signal,
      next: {
        revalidate: 0
      }
    }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch top trends prices');
  }

  return await response.json();
};
