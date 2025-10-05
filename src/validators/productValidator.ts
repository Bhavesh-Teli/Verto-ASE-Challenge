import { z } from 'zod';

export const createProductSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional(),
  stock_quantity: z.number().min(0).optional(),
  low_stock_threshold: z.number().min(0).optional(),
});

export const updateProductSchema = z.object({
  name: z.string().min(1, 'Name is required').optional(),
  description: z.string().optional(),
  stock_quantity: z.number().min(0).optional(),
  low_stock_threshold: z.number().min(0).optional(),
});

export const productIdSchema = z.object({
  id: z.string().length(24, 'Invalid product ID'),
});

export const stockOperationSchema = z.object({
  quantity: z.number().min(1, 'Quantity must be at least 1'),
});