
export type ErrorAction = 'retry' | 'try-later' | 'show-alternatives' | 'contact-support';

export interface ApiResponse<T = unknown> {
  success: boolean;
  code: string;
  message: string;
  data?: T;
  action?: ErrorAction;
  timestamp: string;
  requestId: string;
}

export function successResponse<T>(
  data: T,
  requestId: string,
  message: string = 'Request succeeded'
): ApiResponse<T> {
  return {
    success: true,
    code: 'SUCCESS',
    message,
    data,
    timestamp: new Date().toISOString(),
    requestId,
  };
}

export function errorResponse(
  code: string,
  message: string,
  action: ErrorAction = 'contact-support',
  requestId: string
): ApiResponse {
  return {
    success: false,
    code,
    message,
    action,
    timestamp: new Date().toISOString(),
    requestId,
  };
}

export function redirectResponse(
  url: string,
  requestId: string,
  message: string = 'Redirecting'
): ApiResponse {
  return {
    success: true,
    code: 'REDIRECT',
    message,
    data: { redirectUrl: url },
    timestamp: new Date().toISOString(),
    requestId,
  };
}


export interface PaginationInfo {
  page: number;
  pageSize: number;
  total: number;
  hasMore?: boolean;
}

export function paginatedResponse<T>(
  data: T[],
  pagination: PaginationInfo,
  requestId: string
): ApiResponse<{ items: T[]; pagination: PaginationInfo }> {
  return {
    success: true,
    code: 'SUCCESS',
    message: `Retrieved ${data.length} items`,
    data: {
      items: data,
      pagination: {
        ...pagination,
        hasMore: (pagination.page * pagination.pageSize) < pagination.total,
      },
    },
    timestamp: new Date().toISOString(),
    requestId,
  };
}

export function toNextResponse(
  body: ApiResponse,
  status: number = 200,
  headers?: Record<string, string>
): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'X-Request-ID': body.requestId,
      ...headers,
    },
  });
}

export const HTTP_STATUS_MAP: Record<string, number> = {
  SUCCESS: 200,
  REDIRECT: 302,
  BAD_REQUEST: 400,
  INVALID_INPUT: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  RATE_LIMIT: 429,
  AI_RATE_LIMIT: 429,
  YOUTUBE_QUOTA_EXCEEDED: 429,
  GOOGLE_QUOTA_EXCEEDED: 429,
  INTERNAL_ERROR: 500,
  AI_SERVICE_ERROR: 503,
  DB_CONNECTION_FAILED: 503,
  SERVICE_UNAVAILABLE: 503,
  TIMEOUT: 504,
};

export function getHttpStatus(errorCode: string): number {
  return HTTP_STATUS_MAP[errorCode] || 500;
}

export interface StreamingError extends ApiResponse {
  isStreamingError: true;
}

export function streamingError(
  code: string,
  message: string,
  action: ErrorAction,
  requestId: string
): StreamingError {
  return {
    ...errorResponse(code, message, action, requestId),
    isStreamingError: true,
  };
}

const apiUtils = {
  successResponse,
  errorResponse,
  redirectResponse,
  paginatedResponse,
  toNextResponse,
  getHttpStatus,
  streamingError,
  HTTP_STATUS_MAP,
};

export default apiUtils;
