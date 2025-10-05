import { ZodSchema } from 'zod';
import { errorResponse } from '../utils/response';

export const validateRequest = (schema: ZodSchema) => {
  return (req: any, res: any, next: any) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error: any) {
      if (error && error.errors) {
        const messages = error.errors.map((e: any) => e.message).join(', ');
        return res.status(400).json(
          errorResponse(
            'Validation error',
            messages,
            400
          )
        );
      } else {
        return res.status(400).json(
          errorResponse(
            'Validation error',
            'Invalid request data',
            400
          )
        );
      }
    }
  };
};

export const validateParams = (schema: ZodSchema) => {
  return (req: any, res: any, next: any) => {
    try {
      schema.parse(req.params);
      next();
    } catch (error: any) {
      if (error && error.errors) {
        const messages = error.errors.map((e: any) => e.message).join(', ');
        return res.status(400).json(
          errorResponse(
            'Validation error',
            messages,
            400
          )
        );
      } else {
        return res.status(400).json(
          errorResponse(
            'Validation error',
            'Invalid request parameters',
            400
          )
        );
      }
    }
  };
};