
export enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3,
  FATAL = 4,
}

export interface LogContext {
  requestId: string;
  userId?: string;
  endpoint?: string;
  topic?: string;
  category?: string;
  duration?: number;
  statusCode?: number;
  cacheHit?: boolean;
  tokensUsed?: number;
  source?: string;
  errorCode?: string;
  [key: string]: unknown;
}

interface LogEntry {
  timestamp: string;
  level: string;
  message: string;
  context: LogContext;
  stack?: string;
  environment: string;
}

export class Logger {
  private static isDevelopment = process.env.NODE_ENV !== 'production';
  private static enableDebug = !!process.env.DEBUG;

  static log(
    level: LogLevel,
    message: string,
    context: LogContext,
    error?: Error
  ): void {
    if (level === LogLevel.DEBUG && !this.enableDebug) {
      return;
    }

    const timestamp = new Date().toISOString();
    const levelName = LogLevel[level];

    const logEntry: LogEntry = {
      timestamp,
      level: levelName,
      message,
      context,
      stack: error?.stack,
      environment: process.env.NODE_ENV || 'unknown',
    };

    const logOutput = JSON.stringify(logEntry);

    if (this.isDevelopment) {
      const colorCode = this.getColorCode(level);
      console.log(`${colorCode}${logOutput}\x1b[0m`);
    } else {
      console.log(logOutput);
    }

    if (!this.isDevelopment) {
      this.sendToLoggingService();
    }
  }

  static error(message: string, context: LogContext, error: Error): void {
    this.log(LogLevel.ERROR, message, context, error);
  }

  static fatal(message: string, context: LogContext, error: Error): void {
    this.log(LogLevel.FATAL, message, context, error);
  }

  static warn(message: string, context: LogContext, error?: Error): void {
    this.log(LogLevel.WARN, message, context, error);
  }

  static info(message: string, context: LogContext): void {
    this.log(LogLevel.INFO, message, context);
  }

  static debug(message: string, context: LogContext): void {
    this.log(LogLevel.DEBUG, message, context);
  }

  private static sendToLoggingService(): void {
  }

  private static getColorCode(level: LogLevel): string {
    switch (level) {
      case LogLevel.DEBUG:
        return '\x1b[36m';
      case LogLevel.INFO:
        return '\x1b[32m';
      case LogLevel.WARN:
        return '\x1b[33m';
      case LogLevel.ERROR:
        return '\x1b[31m';
      case LogLevel.FATAL:
        return '\x1b[35m';
      default:
        return '\x1b[37m';
    }
  }
}

export function generateRequestId(): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 11);
  return `${timestamp}-${random}`;
}

export function getOrCreateRequestId(headers: Headers | Record<string, string>): string {
  if (headers instanceof Headers) {
    return headers.get('x-request-id') || generateRequestId();
  }
  return headers['x-request-id'] || generateRequestId();
}

export function createLogContext(
  requestId: string,
  overrides?: Partial<LogContext>
): LogContext {
  return {
    requestId,
    ...overrides,
  };
}

export default Logger;
