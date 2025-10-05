# Inventory Management System API

A complete Inventory Management System API For Verto ASE Challenge.

## Features

- Full CRUD operations for products
- Stock management (increase/decrease stock quantities)
- Low stock alert system
- Input validation with Zod
- Centralized error handling
- Comprehensive test coverage with Jest
- TypeScript support
- MongoDB with Mongoose ODM

## Project Structure

```
src/
  config/       → MongoDB connection
  models/       → Product schema
  controllers/  → Route handlers and business logic
  routes/       → Express routes
  middlewares/  → Error handling & validation
  tests/        → Jest unit tests
  utils/        → Response helpers
  validators/   → Input validation schemas
postman/
  collections/  → Postman API collections
  environments/ → Postman environments
```

## Requirements

- Node.js >= 14.x
- MongoDB >= 4.x

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd inventory-management-api
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with the following content:
   ```env
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/inventory_management
   NODE_ENV=development
   ```

4. Build the project:
   ```bash
   npm run build
   ```

## Usage

### Development

To run the server in development mode with auto-reload:
```bash
npm run dev
```

### Production

To run the server in production mode:
```bash
npm start
```

## API Endpoints

### Product Management

- `POST /api/products` - Create a new product
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get a product by ID
- `PUT /api/products/:id` - Update a product
- `DELETE /api/products/:id` - Delete a product

### Inventory Management

- `POST /api/stock/:id/increase` - Increase stock quantity
- `POST /api/stock/:id/decrease` - Decrease stock quantity
- `GET /api/products/low-stock` - Get products with low stock

## Postman Collection

This project includes a Postman collection for testing the API:

1. Import `postman/Inventory-Management-API.postman_collection.json` into Postman


## Validation

All endpoints use Zod for input validation. Invalid requests will return a 400 Bad Request response with details about validation errors.

## Error Handling

The API uses centralized error handling middleware that provides consistent error responses:
- 400 Bad Request for validation errors
- 404 Not Found for missing resources
- 500 Internal Server Error for unexpected issues

## Testing

Run all tests:
```bash
npm test
```

Run tests in watch mode:
```bash
npm run test:watch
```

## Environment Variables

- `PORT` - Server port (default: 3000)
- `MONGODB_URI` - MongoDB connection string
- `NODE_ENV` - Environment (development/production)

## License

MIT