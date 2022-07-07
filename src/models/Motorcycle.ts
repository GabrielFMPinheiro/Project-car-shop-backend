import { Schema, model as createModel, Document } from 'mongoose';
import { Motorcycle } from '../interfaces/MotorcycleInterface';
import MongoModel from '../schemas/MongoModel';

interface MotorcycleDocument extends Motorcycle, Document {}

export const motorcycleSchema = new Schema<MotorcycleDocument>(
  {
    model: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      required: false,
    },
    buyValue: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      enum: ['Street', 'Custom', 'Trail'],
      required: true,
    },
    engineCapacity: {
      type: Number,
      required: true,
    },
  },
  { versionKey: false },
);

export const motorcycleModel = createModel('Motorcycles', motorcycleSchema);

class MotorcycleModel extends MongoModel<Motorcycle> {
  constructor(model = motorcycleModel) {
    super(model);
  }
}

export default MotorcycleModel;
