import { ErrorRequestHandler } from 'express';
import chalk from 'chalk';
import { ZodError } from 'zod';
import { TErrorHandler, TErrorMessage } from '@/types/errors';
import { statusCodes } from '@/lib/status_codes';
import { handleZodError, ServerError } from '@/errors';

export const defaultError: TErrorHandler = {
	statusCode: statusCodes.INTERNAL_SERVER_ERROR,
	message: 'Something went wrong',
	errorMessages: [],
};

const globalErrorHandler: ErrorRequestHandler = async (error, req, res, _) => {
	console.log(chalk.red('🚨 globalErrorHandler ~~ '), error);

	const { statusCode, message, errorMessages } = formatError(error);

	res.statusCode = statusCode;
	res.statusMessage = message;

	if (process.env.NODE_ENV !== 'production') {
		Object.assign(errorMessages?.[0] ?? {}, { stack: error.stack });
	}

	res.status(statusCode).json(errorMessages);
};

export default globalErrorHandler;

export const formatError = (error: any): TErrorHandler => {
	if (error instanceof ZodError) return handleZodError(error);
	if (error instanceof ServerError)
		return {
			statusCode: error.statusCode,
			message: error.message,
			errorMessages: createErrorMessage(error.message),
		};
	if (error instanceof Error)
		return {
			...defaultError,
			message: error.message,
			errorMessages: createErrorMessage(error.message),
		};

	return defaultError;
};

export const createErrorMessage = (message: string): TErrorMessage[] => [
	{ path: '', message },
];
