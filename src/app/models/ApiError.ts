
export interface ApiError {
  error: {
    type: 'authentication_failed' | string;
    message: string;
  }
}
