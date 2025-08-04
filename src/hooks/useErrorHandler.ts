import { message } from 'antd';

/**
 * Simple error handler for static data operations
 */
export const useErrorHandler = () => {
  const handleError = (error: unknown) => {
    const errorMessage = error instanceof Error ? error.message : 'Something went wrong';
    console.error('Error:', error);
    message.error(errorMessage);
  };

  return { handleError };
};