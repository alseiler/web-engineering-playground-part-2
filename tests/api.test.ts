import { describe, it, expect, vi, afterEach } from 'vitest';
import { fetchImageUrl } from '../src/api';

describe('fetchImageUrl', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should return image URL when API call is successful', async () => {
    const mockResponse = {
      query: {
        pages: {
          '12345': {
            imageinfo: [{ url: 'https://example.com/image.jpg' }],
          },
        },
      },
    };

    // Mock fetch function directly with vi.fn()
    vi.stubGlobal(
      'fetch',
      vi.fn(
        async () =>
          await Promise.resolve({
            json: async () => await Promise.resolve(mockResponse),
          })
      )
    );

    const imageUrl = await fetchImageUrl('test.jpg');
    expect(imageUrl).toBe('https://example.com/image.jpg');
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it('should return placeholder image URL when API call fails', async () => {
    // Mock fetch to reject the promise (simulate an error)
    vi.stubGlobal(
      'fetch',
      vi.fn(async () => await Promise.reject(new Error('API Error')))
    );

    const imageUrl = await fetchImageUrl('test.jpg');
    expect(imageUrl).toBe('placeholder-panda.jpg');
    expect(fetch).toHaveBeenCalledTimes(1);
  });
});
