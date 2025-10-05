# Postman Collection for Inventory Management API

This directory contains the Postman collection and environment files for testing the Inventory Management API.

## Files

1. `Inventory Management API.postman_collection.json` - The main Postman collection with all API endpoints

## How to Use

1. Import the collection into Postman:
   - Open Postman
   - Click "Import" button
   - Select the `Inventory-Management-API.postman_collection.json` file

## Endpoints Included

### Health Check
- `GET /health` - Check if the server is running

### Product Management
- `POST /api/products` - Create a new product
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get a product by ID
- `PUT /api/products/:id` - Update a product
- `DELETE /api/products/:id` - Delete a product

### Inventory Management
- `POST /api/stock/:id/increase` - Increase stock quantity
- `POST /api/stock/:id/decrease` - Decrease stock quantity

### Reports
- `GET /api/products/low-stock` - Get products with low stock

## Variables

The environment includes the following variables:
- `base_url`: The base URL of the API (default: http://localhost:3000)
- `api_prefix`: The API prefix (default: /api)
- `product_endpoint`: The product endpoint (default: /products)