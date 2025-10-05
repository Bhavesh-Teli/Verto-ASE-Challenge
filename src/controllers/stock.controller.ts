import { Request, Response, NextFunction } from 'express';
import Product from '../models/Product';
import { successResponse } from '../utils/response';
import { AppError } from '../middlewares/errorHandler';
import { StockOperationInput, ProductControllerResponse } from '../types/product.types';

export const increaseStock = async (
    req: Request<{ id: string }, {}, StockOperationInput>,
    res: Response<ProductControllerResponse>,
    next: NextFunction
): Promise<void> => {
    try {
        const { quantity } = req.body;
        const product = await Product.findById(req.params.id);
        if (!product) {
            throw new AppError('Product not found', 404);
        }

        product.stock_quantity += quantity;
        const updatedProduct = await product.save();
        res.status(200).json(successResponse(updatedProduct, 'Stock increased successfully'));
    } catch (error) {
        if (error instanceof AppError) {
            next(error);
        } else {
            next(new AppError('Failed to increase stock', 500));
        }
    }
};

export const decreaseStock = async (
    req: Request<{ id: string }, {}, StockOperationInput>,
    res: Response<ProductControllerResponse>,
    next: NextFunction
): Promise<void> => {
    try {
        const { quantity } = req.body;
        const product = await Product.findById(req.params.id);
        if (!product) {
            throw new AppError('Product not found', 404);
        }

        if (product.stock_quantity < quantity) {
            throw new AppError('Insufficient stock', 400);
        }

        product.stock_quantity -= quantity;
        const updatedProduct = await product.save();
        res.status(200).json(successResponse(updatedProduct, 'Stock decreased successfully'));
    } catch (error) {
        if (error instanceof AppError) {
            next(error);
        } else {
            next(new AppError('Failed to decrease stock', 500));
        }
    }
};