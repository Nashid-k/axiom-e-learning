
export enum ErrorCode {
  AI_RATE_LIMIT = 'AI_RATE_LIMIT',
  AI_QUOTA_EXCEEDED = 'AI_QUOTA_EXCEEDED',
  AI_SERVICE_DOWN = 'AI_SERVICE_DOWN',
  AI_TIMEOUT = 'AI_TIMEOUT',
  AI_INVALID_REQUEST = 'AI_INVALID_REQUEST',
  AI_AUTH_FAILED = 'AI_AUTH_FAILED',
  AI_MODEL_ERROR = 'AI_MODEL_ERROR',

  SEARCH_RATE_LIMIT = 'SEARCH_RATE_LIMIT',
  GOOGLE_QUOTA_EXCEEDED = 'GOOGLE_QUOTA_EXCEEDED',
  YOUTUBE_QUOTA_EXCEEDED = 'YOUTUBE_QUOTA_EXCEEDED',
  SEARCH_SERVICE_DOWN = 'SEARCH_SERVICE_DOWN',
  YOUTUBE_FORBIDDEN = 'YOUTUBE_FORBIDDEN',

  DB_CONNECTION_FAILED = 'DB_CONNECTION_FAILED',
  DB_DNS_FAIL = 'DB_DNS_FAIL',
  DB_AUTH_FAILED = 'DB_AUTH_FAILED',
  DB_TIMEOUT = 'DB_TIMEOUT',

  INVALID_INPUT = 'INVALID_INPUT',
  MISSING_PARAMETER = 'MISSING_PARAMETER',

  UNKNOWN_ERROR = 'UNKNOWN_ERROR',
}

interface ErrorMapping {
  userMessage: string;
  action: 'retry' | 'try-later' | 'show-alternatives' | 'contact-support';
  hideDetails: boolean;
}

const ERROR_MAPPINGS: Record<ErrorCode, ErrorMapping> = {
  [ErrorCode.AI_RATE_LIMIT]: {
    userMessage: "Mentor is busy right now. Please wait a moment and try again.",
    action: 'retry',
    hideDetails: true,
  },
  [ErrorCode.AI_QUOTA_EXCEEDED]: {
    userMessage: "Mentor service is busy today. Please try again in a few minutes.",
    action: 'try-later',
    hideDetails: true,
  },
  [ErrorCode.AI_SERVICE_DOWN]: {
    userMessage: "Mentor is temporarily unavailable. Please try again in a moment.",
    action: 'try-later',
    hideDetails: true,
  },
  [ErrorCode.AI_TIMEOUT]: {
    userMessage: "Mentor is taking too long. Please try again.",
    action: 'retry',
    hideDetails: true,
  },
  [ErrorCode.AI_INVALID_REQUEST]: {
    userMessage: "Something went wrong with your request. Please try with a simpler question.",
    action: 'contact-support',
    hideDetails: true,
  },
  [ErrorCode.AI_AUTH_FAILED]: {
    userMessage: "Mentor configuration issue. Please contact support.",
    action: 'contact-support',
    hideDetails: true,
  },
  [ErrorCode.AI_MODEL_ERROR]: {
    userMessage: "Mentor is having trouble retrieving knowledge. Please try again.",
    action: 'retry',
    hideDetails: true,
  },

  [ErrorCode.SEARCH_RATE_LIMIT]: {
    userMessage: "Resource search is busy. Showing available resources.",
    action: 'show-alternatives',
    hideDetails: true,
  },
  [ErrorCode.GOOGLE_QUOTA_EXCEEDED]: {
    userMessage: "Article search is temporarily limited. Try searching videos instead.",
    action: 'show-alternatives',
    hideDetails: true,
  },
  [ErrorCode.YOUTUBE_QUOTA_EXCEEDED]: {
    userMessage: "Video search is temporarily limited. Try searching articles instead.",
    action: 'show-alternatives',
    hideDetails: true,
  },
  [ErrorCode.YOUTUBE_FORBIDDEN]: {
    userMessage: "Some videos aren't available. Try other resources.",
    action: 'show-alternatives',
    hideDetails: true,
  },
  [ErrorCode.SEARCH_SERVICE_DOWN]: {
    userMessage: "Resource search is temporarily unavailable. Please try again later.",
    action: 'try-later',
    hideDetails: true,
  },

  [ErrorCode.DB_CONNECTION_FAILED]: {
    userMessage: "Having trouble connecting to our servers. Please try again.",
    action: 'retry',
    hideDetails: true,
  },
  [ErrorCode.DB_DNS_FAIL]: {
    userMessage: "Network issue. Please check your connection and try again.",
    action: 'retry',
    hideDetails: true,
  },
  [ErrorCode.DB_AUTH_FAILED]: {
    userMessage: "Authentication issue. Please refresh and try again.",
    action: 'contact-support',
    hideDetails: true,
  },
  [ErrorCode.DB_TIMEOUT]: {
    userMessage: "Request timed out. Please try again.",
    action: 'retry',
    hideDetails: true,
  },

  [ErrorCode.INVALID_INPUT]: {
    userMessage: "Please check your input and try again.",
    action: 'contact-support',
    hideDetails: true,
  },
  [ErrorCode.MISSING_PARAMETER]: {
    userMessage: "Something's missing. Please try again.",
    action: 'contact-support',
    hideDetails: true,
  },

  [ErrorCode.UNKNOWN_ERROR]: {
    userMessage: "Something went wrong. Please try again.",
    action: 'retry',
    hideDetails: true,
  },
};

export function classifyError(error: unknown): ErrorCode {
  if (!error) return ErrorCode.UNKNOWN_ERROR;

  const err = error as { message?: string; status?: number; statusCode?: number; toString?: () => string };
  const message = (err.message || err.toString?.() || String(error) || '').toLowerCase();
  const status = err.status || err.statusCode;

  if (status === 429 || message.includes('rate limit') || message.includes('quota')) {
    if (message.includes('youtube') || message.includes('video')) {
      return ErrorCode.YOUTUBE_QUOTA_EXCEEDED;
    }
    if (message.includes('google')) {
      return ErrorCode.GOOGLE_QUOTA_EXCEEDED;
    }
    if (message.includes('groq') || message.includes('ai') || message.includes('llm')) {
      return ErrorCode.AI_RATE_LIMIT;
    }
    return ErrorCode.SEARCH_RATE_LIMIT;
  }

  if (status === 401 || (message.includes('unauthorized') && (message.includes('groq') || message.includes('ai')))) {
    return ErrorCode.AI_AUTH_FAILED;
  }

  if ((status === 404 || status === 400) && (message.includes('model') || message.includes('not found'))) {
    return ErrorCode.AI_MODEL_ERROR;
  }

  if (status === 503 || status === 502 || status === 504 || message.includes('service unavailable')) {
    if (message.includes('ai') || message.includes('llm')) {
      return ErrorCode.AI_SERVICE_DOWN;
    }
    return ErrorCode.SEARCH_SERVICE_DOWN;
  }

  if (status === 408 || message.includes('timeout') || message.includes('timed out')) {
    if (message.includes('ai') || message.includes('llm')) {
      return ErrorCode.AI_TIMEOUT;
    }
    return ErrorCode.DB_TIMEOUT;
  }

  if (message.includes('connect') || message.includes('connection')) {
    return ErrorCode.DB_CONNECTION_FAILED;
  }
  if (message.includes('dns') || message.includes('enotfound') || message.includes('getaddrinfo')) {
    return ErrorCode.DB_DNS_FAIL;
  }
  if (message.includes('auth') || message.includes('unauthorized')) {
    return ErrorCode.DB_AUTH_FAILED;
  }

  if (message.includes('invalid_request_error') || message.includes('invalid request')) {
    return ErrorCode.AI_INVALID_REQUEST;
  }

  if (status === 403 && (message.includes('youtube') || message.includes('video'))) {
    return ErrorCode.YOUTUBE_FORBIDDEN;
  }

  if (status === 400 || message.includes('invalid')) {
    return ErrorCode.INVALID_INPUT;
  }

  return ErrorCode.UNKNOWN_ERROR;
}

export function getUserMessage(code: ErrorCode): string {
  const mapping = ERROR_MAPPINGS[code];
  return mapping ? mapping.userMessage : ERROR_MAPPINGS[ErrorCode.UNKNOWN_ERROR].userMessage;
}

export function getErrorAction(code: ErrorCode): 'retry' | 'try-later' | 'show-alternatives' | 'contact-support' {
  const mapping = ERROR_MAPPINGS[code];
  return mapping ? mapping.action : 'contact-support';
}

export function logErrorSafely(
  error: unknown,
  context: string,
  logger: (msg: string) => void = console.error
): ErrorCode {
  const code = classifyError(error);
  const err = error as { message?: string; status?: number; statusCode?: number };
  const sanitized = {
    code,
    context,
    message: err?.message || String(error),
    status: err?.status || err?.statusCode,
    timestamp: new Date().toISOString(),
  };

  logger(`[${sanitized.context}] ${sanitized.code}: ${sanitized.message}`);
  return code;
}

export function createSafeErrorResponse(error: unknown, context: string) {
  const code = logErrorSafely(error, context);
  const userMessage = getUserMessage(code);
  const action = getErrorAction(code);

  return {
    error: userMessage,
    code,
    action, 
  };
}

export function handleStreamError(
  error: unknown,
  controller: ReadableStreamController<Uint8Array>,
  context: string
) {
  const code = logErrorSafely(error, context);
  const userMessage = getUserMessage(code);

  const encoder = new TextEncoder();
  const errorMsg = `\n\n[Error] ${userMessage}`;
  controller.enqueue(encoder.encode(errorMsg));
  controller.close();
}
