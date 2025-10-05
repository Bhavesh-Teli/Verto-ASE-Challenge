import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import Product from '../models/Product';
import * as productController from '../controllers/product.controller';
import * as stockController from '../controllers/stock.controller';
const mockRequest = () => {
  const req: any = {};
  req.body = {};
  req.params = {};
  return req;
};

const mockResponse = () => {
  const res: any = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

const mockNext = () => jest.fn();

describe('Product Controller', () => {
  let mongoServer: MongoMemoryServer;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    await mongoose.connect(mongoUri);
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  beforeEach(async () => {
    await Product.deleteMany({});
  });

  describe('createProduct', () => {
    it('should create a new product', async () => {
      const req = mockRequest();
      const res = mockResponse();
      const next = mockNext();

      req.body = {
        name: 'Test Product',
        description: 'Test Description',
        stock_quantity: 10,
        low_stock_threshold: 5,
      };

      await productController.createProduct(req, res, next);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalled();
    });
  });

  describe('getAllProducts', () => {
    it('should return all products', async () => {
      const req = mockRequest();
      const res = mockResponse();
      const next = mockNext();

      await Product.create({
        name: 'Product 1',
        stock_quantity: 10,
      });

      await Product.create({
        name: 'Product 2',
        stock_quantity: 5,
      });

      await productController.getAllProducts(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalled();
    });
  });

  describe('getProductById', () => {
    it('should return a product by ID', async () => {
      const product = await Product.create({
        name: 'Test Product',
        stock_quantity: 10,
      });

      const req = mockRequest();
      const res = mockResponse();
      const next = mockNext();

      req.params.id = (product as any)._id.toString();

      await productController.getProductById(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalled();
    });

    it('should call next with an error if product not found', async () => {
      const req = mockRequest();
      const res = mockResponse();
      const next = mockNext();

      req.params.id = new mongoose.Types.ObjectId().toString();

      await productController.getProductById(req, res, next);

      expect(next).toHaveBeenCalled();
    });
  });

  describe('updateProduct', () => {
    it('should update a product', async () => {
      const product = await Product.create({
        name: 'Test Product',
        stock_quantity: 10,
      });

      const req = mockRequest();
      const res = mockResponse();
      const next = mockNext();

      req.params.id = (product as any)._id.toString();
      req.body = {
        name: 'Updated Product',
        stock_quantity: 20,
      };

      await productController.updateProduct(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalled();
    });

    it('should call next with an error if product not found', async () => {
      const req = mockRequest();
      const res = mockResponse();
      const next = mockNext();

      req.params.id = new mongoose.Types.ObjectId().toString();
      req.body = {
        name: 'Updated Product',
      };

      await productController.updateProduct(req, res, next);

      expect(next).toHaveBeenCalled();
    });
  });

  describe('deleteProduct', () => {
    it('should delete a product', async () => {
      const product = await Product.create({
        name: 'Test Product',
        stock_quantity: 10,
      });

      const req = mockRequest();
      const res = mockResponse();
      const next = mockNext();

      req.params.id = (product as any)._id.toString();

      await productController.deleteProduct(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalled();

      const deletedProduct = await Product.findById((product as any)._id);
      expect(deletedProduct).toBeNull();
    });

    it('should call next with an error if product not found', async () => {
      const req = mockRequest();
      const res = mockResponse();
      const next = mockNext();

      req.params.id = new mongoose.Types.ObjectId().toString();

      await productController.deleteProduct(req, res, next);

      expect(next).toHaveBeenCalled();
    });
  });

  describe('getLowStockProducts', () => {
    it('should return products with stock below threshold', async () => {
      await Product.create({
        name: 'Low Stock Product',
        stock_quantity: 3,
        low_stock_threshold: 5,
      });

      await Product.create({
        name: 'Normal Stock Product',
        stock_quantity: 10,
        low_stock_threshold: 5,
      });

      const req = mockRequest();
      const res = mockResponse();
      const next = mockNext();

      await productController.getLowStockProducts(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalled();
    });
  });
});

describe('Stock Controller', () => {
  let mongoServer: MongoMemoryServer;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    await mongoose.connect(mongoUri);
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  beforeEach(async () => {
    await Product.deleteMany({});
  });

  describe('increaseStock', () => {
    it('should increase stock quantity', async () => {
      const product = await Product.create({
        name: 'Test Product',
        stock_quantity: 10,
      });

      const req = mockRequest();
      const res = mockResponse();
      const next = mockNext();

      req.params.id = (product as any)._id.toString();
      req.body = { quantity: 5 };

      await stockController.increaseStock(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalled();

      const updatedProduct = await Product.findById((product as any)._id);
      expect(updatedProduct?.stock_quantity).toBe(15);
    });

    it('should call next with an error if product not found', async () => {
      const req = mockRequest();
      const res = mockResponse();
      const next = mockNext();

      req.params.id = new mongoose.Types.ObjectId().toString();
      req.body = { quantity: 5 };

      await stockController.increaseStock(req, res, next);

      expect(next).toHaveBeenCalled();
    });
  });

  describe('decreaseStock', () => {
    it('should decrease stock quantity', async () => {
      const product = await Product.create({
        name: 'Test Product',
        stock_quantity: 10,
      });

      const req = mockRequest();
      const res = mockResponse();
      const next = mockNext();

      req.params.id = (product as any)._id.toString();
      req.body = { quantity: 5 };

      await stockController.decreaseStock(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalled();

      const updatedProduct = await Product.findById((product as any)._id);
      expect(updatedProduct?.stock_quantity).toBe(5);
    });

    it('should call next with an error if product not found', async () => {
      const req = mockRequest();
      const res = mockResponse();
      const next = mockNext();

      req.params.id = new mongoose.Types.ObjectId().toString();
      req.body = { quantity: 5 };

      await stockController.decreaseStock(req, res, next);

      expect(next).toHaveBeenCalled();
    });

    it('should call next with an error if insufficient stock', async () => {
      const product = await Product.create({
        name: 'Test Product',
        stock_quantity: 3,
      });

      const req = mockRequest();
      const res = mockResponse();
      const next = mockNext();

      req.params.id = (product as any)._id.toString();
      req.body = { quantity: 5 };

      await stockController.decreaseStock(req, res, next);

      expect(next).toHaveBeenCalled();
    });
  });
});