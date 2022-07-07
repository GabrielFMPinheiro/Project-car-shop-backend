import { Car } from '../../../interfaces/CarInterface';
import { Model } from '../../../interfaces/ModelInterface';
import {
  ServiceError,
  Service as StandardService,
} from '../../../interfaces/ServiceInterface';

export interface CarMockReceived extends Car {
  _id: string;
}

export const carMockSent: Car = {
  model: 'Ferrari Maranello',
  year: 1963,
  color: 'red',
  buyValue: 3500000,
  seatsQty: 2,
  doorsQty: 2,
};

export const carMockCreated: CarMockReceived = {
  _id: '62c5f913340a5746411d69f5',
  model: 'Ferrari Maranello',
  year: 1963,
  color: 'red',
  buyValue: 3500000,
  seatsQty: 2,
  doorsQty: 2,
};

export class CarModelMock implements Model<Car> {
  create = async (obj: Car): Promise<any> => {
    return { _id: '62c5f913340a5746411d69f5', ...obj };
  };

  read = async (): Promise<Car[]> => {
    throw new Error('Method not implemented.');
  };

  readOne = async (id: string): Promise<Car | null> => {
    throw new Error('Method not implemented.');
  };

  update = async (id: string, obj: Car): Promise<Car | null> => {
    throw new Error('Method not implemented.');
  };

  delete = async (id: string): Promise<Car | null> => {
    throw new Error('Method not implemented.');
  };
}

export class CarServiceMock implements StandardService<Car> {
  create = async (obj: Car): Promise<CarMockReceived | ServiceError | null> => {
    return { _id: '62c5f913340a5746411d69f5', ...obj };
  };

  read = async (): Promise<Car[]> => {
    throw new Error('Method not implemented.');
  };

  readOne = async (id: string): Promise<Car | null> => {
    throw new Error('Method not implemented.');
  };

  update = async (id: string, obj: Car): Promise<Car | null> => {
    throw new Error('Method not implemented.');
  };

  delete = async (id: string): Promise<Car | null> => {
    throw new Error('Method not implemented.');
  };
}
