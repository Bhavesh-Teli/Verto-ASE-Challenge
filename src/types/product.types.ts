import { IProduct } from '../models/Product';

export interface ProductInput {
  name: string;
  description?: string;
  stock_quantity?: number;
  low_stock_threshold?: number;
}

export interface ProductUpdateInput {
  name?: string;
  description?: string;
  stock_quantity?: number;
  low_stock_threshold?: number;
}

export interface StockOperationInput {
  quantity: number;
}

export interface ProductControllerResponse {
  success: boolean;
  message: string;
  data?: IProduct | IProduct[] | null;
  error?: string;
}