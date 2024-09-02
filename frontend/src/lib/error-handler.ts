import axios from 'axios';
import { customLogger } from '@/lib/logger';

export function handleAxiosError(error: unknown, errorContext: string) {
  if (axios.isAxiosError(error)) {
    customLogger('error', errorContext, {
      message: error.message,
      code: error.code,
      config: error.config,
      response: error.response
        ? {
            status: error.response.status,
            headers: error.response.headers,
            data: error.response.data,
          }
        : 'No response received',
      request: error.request ? error.request : 'No request made',
    });
  } else {
    customLogger('error', errorContext, error);
  }
}
