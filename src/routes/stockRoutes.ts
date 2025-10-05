import express from 'express';
import * as stockController from '../controllers/stock.controller';
import { validateRequest, validateParams } from '../middlewares/validation';
import {
    productIdSchema,
    stockOperationSchema
} from '../validators/productValidator';

const router = express.Router();

router.post(
    '/:id/increase',
    validateParams(productIdSchema),
    validateRequest(stockOperationSchema),
    stockController.increaseStock
);

router.post(
    '/:id/decrease',
    validateParams(productIdSchema),
    validateRequest(stockOperationSchema),
    stockController.decreaseStock
);

export default router;