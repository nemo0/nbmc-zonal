interface HttpErrorOptions {
  status: number;
  statusText: string;
  data?: unknown;
}

export class HttpError extends Error {
  status: number;
  statusText: string;
  data?: unknown;

  constructor(message: string, options: HttpErrorOptions) {
    super(message);
    this.name = 'HttpError';
    this.status = options.status;
    this.statusText = options.statusText;
    this.data = options.data;
  }
}

function isJsonResponse(response: Response) {
  const contentType = response.headers.get('content-type') || '';
  return contentType.includes('application/json');
}

async function readResponseBody(response: Response): Promise<unknown> {
  if (response.status === 204) {
    return null;
  }

  if (isJsonResponse(response)) {
    return response.json();
  }

  const text = await response.text();
  return text || null;
}

function buildErrorMessage(status: number, statusText: string) {
  if (!statusText) {
    return `Request failed with status ${status}`;
  }

  return `Request failed with status ${status}: ${statusText}`;
}

async function assertOk(response: Response) {
  if (response.ok) {
    return;
  }

  const data = await readResponseBody(response);
  throw new HttpError(buildErrorMessage(response.status, response.statusText), {
    status: response.status,
    statusText: response.statusText,
    data,
  });
}

function toJsonInit(method: string, body?: unknown): RequestInit {
  return {
    method,
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: body === undefined ? undefined : JSON.stringify(body),
  };
}

async function requestJson<T>(url: string, init: RequestInit): Promise<T> {
  const response = await fetch(url, init);
  await assertOk(response);

  return (await readResponseBody(response)) as T;
}

export function getJson<T>(url: string): Promise<T> {
  return requestJson<T>(url, {
    method: 'GET',
    credentials: 'same-origin',
  });
}

export function postJson<T>(url: string, body?: unknown): Promise<T> {
  return requestJson<T>(url, toJsonInit('POST', body));
}

export function putJson<T>(url: string, body?: unknown): Promise<T> {
  return requestJson<T>(url, toJsonInit('PUT', body));
}

export async function postBlob(url: string, body?: unknown): Promise<Blob> {
  const response = await fetch(url, toJsonInit('POST', body));
  await assertOk(response);
  return response.blob();
}

function objectHasTextProperty(
  value: unknown,
  key: 'error' | 'message'
): value is Record<'error' | 'message', unknown> {
  return typeof value === 'object' && value !== null && key in value;
}

export function getHttpErrorMessage(error: unknown, fallback: string) {
  if (error instanceof HttpError) {
    if (typeof error.data === 'string' && error.data.trim()) {
      return error.data;
    }

    if (objectHasTextProperty(error.data, 'error')) {
      const value = error.data.error;
      if (typeof value === 'string' && value.trim()) {
        return value;
      }
    }

    if (objectHasTextProperty(error.data, 'message')) {
      const value = error.data.message;
      if (typeof value === 'string' && value.trim()) {
        return value;
      }
    }
  }

  return fallback;
}
