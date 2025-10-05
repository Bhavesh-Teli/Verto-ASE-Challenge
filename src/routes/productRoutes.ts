import express from 'express';
import * as productController from '../controllers/product.controller';
import { validateRequest, validateParams } from '../middlewares/validation';
import {
    createProductSchema,
    updateProductSchema,
    productIdSchema
} from '../validators/productValidator';

const router = express.Router();

router.post(
    '/',
    validateRequest(createProductSchema),
    productController.createProduct
);

router.get('/', productController.getAllProducts);

router.get('/low-stock', productController.getLowStockProducts);

router.get(
    '/:id',
    validateParams(productIdSchema),
    productController.getProductById
);

router.put(
    '/:id',
    validateParams(productIdSchema),
    validateRequest(updateProductSchema),
    productController.updateProduct
);

router.delete(
    '/:id',
    validateParams(productIdSchema),
    productController.deleteProduct
);

export default router;