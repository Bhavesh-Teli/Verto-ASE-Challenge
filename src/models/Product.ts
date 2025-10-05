import mongoose, { Document, Schema } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  description?: string;
  stock_quantity: number;
  low_stock_threshold: number;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    stock_quantity: {
      type: Number,
      default: 0,
      min: 0,
    },
    low_stock_threshold: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

ProductSchema.pre<IProduct>('save', function (next) {
  if (this.stock_quantity < 0) {
    this.stock_quantity = 0;
  }
  next();
});

const Product = mongoose.model<IProduct>('Product', ProductSchema);
export default Product;