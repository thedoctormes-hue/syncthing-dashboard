import '@testing-library/jest-dom';

// Mock fetch for tests
const mockFetch = () =>
  Promise.resolve({
    json: () => Promise.resolve({ status: 'ok', data: [] }),
    ok: true,
    status: 200,
  });

globalThis.fetch = mockFetch as typeof fetch;
