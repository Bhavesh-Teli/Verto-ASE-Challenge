import { Request, Response, NextFunction } from 'express';
import Product, { IProduct } from '../models/Product';
import { successResponse } from '../utils/response';
import { AppError } from '../middlewares/errorHandler';
import { ProductInput, ProductUpdateInput, ProductControllerResponse } from '../types/product.types';
import { CLIENT_RENEG_LIMIT } from 'tls';

export const createProduct = async (
    req: Request<{}, {}, ProductInput>,
    res: Response<ProductControllerResponse>,
    next: NextFunction
): Promise<void> => {
    try {
        const product = new Product(req.body);
        const savedProduct = await product.save();
        res.status(201).json(successResponse(savedProduct, 'Product created successfully'));
    } catch (error) {
        next(new AppError('Failed to create product', 500));
    }
};

export const getAllProducts = async (
    req: Request,
    res: Response<ProductControllerResponse>,
    next: NextFunction
): Promise<void> => {
    try {
        const products = await Product.find();
        res.status(200).json(successResponse(products, 'Products fetched successfully'));
    } catch (error) {
        next(new AppError('Failed to fetch products', 500));
    }
};

export const getProductById = async (
    req: Request<{ id: string }>,
    res: Response<ProductControllerResponse>,
    next: NextFunction
): Promise<void> => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            throw new AppError('Product not found', 404);
        }
        res.status(200).json(successResponse(product, 'Product fetched successfully'));
    } catch (error) {
        if (error instanceof AppError) {
            next(error);
        } else {
            next(new AppError('Failed to fetch product', 500));
        }
    }
};

export const updateProduct = async (
    req: Request<{ id: string }, {}, ProductUpdateInput>,
    res: Response<ProductControllerResponse>,
    next: NextFunction
): Promise<void> => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!product) {
            throw new AppError('Product not found', 404);
        }
        res.status(200).json(successResponse(product, 'Product updated successfully'));
    } catch (error) {
        if (error instanceof AppError) {
            next(error);
        } else {
            next(new AppError('Failed to update product', 500));
        }
    }
};

export const deleteProduct = async (
    req: Request<{ id: string }>,
    res: Response<ProductControllerResponse>,
    next: NextFunction
): Promise<void> => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            throw new AppError('Product not found', 404);
        }
        res.status(200).json(successResponse(null, 'Product deleted successfully'));
    } catch (error) {
        if (error instanceof AppError) {
            next(error);
        } else {
            next(new AppError('Failed to delete product', 500));
        }
    }
};

export const getLowStockProducts = async (
    req: Request,
    res: Response<ProductControllerResponse>,
    next: NextFunction
): Promise<void> => {
    try {
        console.log("getLowStockProducts - Auto-restart is working pe drfectly!");
        const products = await Product.find({
            $expr: { $lt: ['$stock_quantity', '$low_stock_threshold'] }
        });
        res.status(200).json(successResponse(products, 'Low stock products fetched successfully'));
    } catch (error:any) {
        console.log(error.message);
        next(new AppError('Failed to fetch low stock products', 500));
    }
};
