export interface APIResponse<T> {
  data: T;
  message: string;
  status: number;
}

export interface APIError {
  message: string;
  code: string;
  details?: unknown;
}
