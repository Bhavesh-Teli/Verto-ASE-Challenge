export interface ApiResponse<T = null> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

export const successResponse = <T>(
  data: T,
  message: string = 'Success'
): ApiResponse<T> => {
  return {
    success: true,
    message,
    data,
  };
};

export const errorResponse = (
  message: string,
  error: string = '',
  statusCode: number = 500
): ApiResponse => {
  return {
    success: false,
    message,
    error,
  };
};