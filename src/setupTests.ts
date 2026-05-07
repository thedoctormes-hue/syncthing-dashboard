import '@testing-library/jest-dom/vitest';

// Mock fetch for tests
globalThis.fetch = (() =>
  Promise.resolve({
    json: () => Promise.resolve({ status: 'ok', data: [] }),
    ok: true,
    status: 200,
  })) as unknown as typeof fetch;
