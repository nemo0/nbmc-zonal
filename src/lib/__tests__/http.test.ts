import {
  getHttpErrorMessage,
  getJson,
  HttpError,
  postBlob,
  postJson,
} from '@/lib/http';

describe('HTTP helpers', () => {
  const mockFetch = jest.fn();

  const createJsonResponse = (status: number, body: unknown, statusText = '') =>
    ({
      ok: status >= 200 && status < 300,
      status,
      statusText,
      headers: {
        get: (header: string) =>
          header.toLowerCase() === 'content-type' ? 'application/json' : null,
      },
      json: async () => body,
      text: async () => JSON.stringify(body),
      blob: async () => new Blob([JSON.stringify(body)]),
    } as unknown as Response);

  const createBlobResponse = (status: number, body: Blob) =>
    ({
      ok: status >= 200 && status < 300,
      status,
      statusText: '',
      headers: {
        get: () => 'application/octet-stream',
      },
      json: async () => ({}),
      text: async () => '',
      blob: async () => body,
    } as unknown as Response);

  beforeEach(() => {
    global.fetch = mockFetch as unknown as typeof fetch;
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('returns parsed JSON for successful GET requests', async () => {
    mockFetch.mockResolvedValue(createJsonResponse(200, { success: true }));

    const response = await getJson<{ success: boolean }>('/api/test');

    expect(response).toEqual({ success: true });
    expect(mockFetch).toHaveBeenCalledWith('/api/test', {
      method: 'GET',
      credentials: 'same-origin',
    });
  });

  it('throws HttpError and extracts API error message for failed JSON requests', async () => {
    mockFetch.mockResolvedValue(
      createJsonResponse(400, { error: 'Bad input' }, 'Bad Request')
    );

    let thrownError: unknown;
    try {
      await postJson('/api/test', { id: 1 });
    } catch (error) {
      thrownError = error;
    }

    expect(thrownError).toBeInstanceOf(HttpError);
    expect(getHttpErrorMessage(thrownError, 'Fallback')).toBe('Bad input');
    expect(mockFetch).toHaveBeenCalledWith('/api/test', {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: 1 }),
    });
  });

  it('returns blob for export-style POST requests', async () => {
    mockFetch.mockResolvedValue(
      createBlobResponse(200, new Blob(['xlsx-data']))
    );

    const blob = await postBlob('/api/export', { data: [] });

    expect(blob).toBeInstanceOf(Blob);
    expect(blob.size).toBeGreaterThan(0);
  });

  it('falls back when error does not contain API message', () => {
    expect(getHttpErrorMessage(new Error('random'), 'Fallback')).toBe(
      'Fallback'
    );
  });
});
