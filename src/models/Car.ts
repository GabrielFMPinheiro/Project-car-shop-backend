import { Schema, model as createModel, Document } from 'mongoose';
import { Car } from '../interfaces/CarInterface';
import MongoModel from '../schemas/MongoModel';

interface CarDocument extends Car, Document {}

export const carSchema = new Schema<CarDocument>(
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
    doorsQty: {
      type: Number,
      required: true,
    },
    seatsQty: {
      type: Number,
      required: true,
    },
  },
  { versionKey: false },
);

export const carModel = createModel('Cars', carSchema);
class CarModel extends MongoModel<Car> {
  constructor(model = carModel) {
    super(model);
  }
}

export default CarModel;
