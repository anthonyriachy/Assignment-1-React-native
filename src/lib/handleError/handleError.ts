import { AxiosError } from 'axios';
import { ErrorCodes } from '../../constants/ErrorCodes';

export const handleError = (error: unknown): string => {
    if (error instanceof AxiosError) {

        if (error.response?.data?.error?.message) {

            return error.response.data.error.message;
        }

        // Handle HTTP status code errors
        if (error.response?.status) {
            switch (error.response.status) {
                case ErrorCodes.UNAUTHORIZED:
                    return 'Unauthorized. Please login again.';
                case ErrorCodes.FORBIDDEN:
                    return 'Access forbidden.';
                case ErrorCodes.NOT_FOUND:
                    return 'Resource not found.';
                case ErrorCodes.INTERNAL_SERVER_ERROR:
                    return 'Server error. Please try again later.';
                default:
                    return error.response.data?.message || 'An error occurred. Please try again.';
            }
        }

        // Handle network errors last
        if (!error.response) {
            return 'Network error. Please check your internet connection.';
        }
    }

    if (error instanceof Error) {
        return error.message;
    }

    return 'An unexpected error occurred';
};
