import { Car, CarSchema } from '../../../interfaces/CarInterface';
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

export const carMockBadFormat: Car = {
  model: 'Ferrari Maranello',
  year: 1800,
  color: 'red',
  buyValue: 3500000,
  seatsQty: 4,
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

export const carsMock: CarMockReceived[] = [
  {
    _id: '62c5f913340a5746411d69f5',
    model: 'Ferrari Maranello',
    year: 1963,
    color: 'red',
    buyValue: 3500000,
    seatsQty: 2,
    doorsQty: 2,
  },
  {
    _id: '62c5f913340a5746411d69f7',
    model: 'Mercedes-benz classe A',
    year: 1942,
    color: 'blue',
    buyValue: 340000,
    seatsQty: 1,
    doorsQty: 2,
  },
];

export const carMockUpdated: Car = {
  model: 'Ferrari Maranello',
  year: 1963,
  color: 'red',
  buyValue: 3500000,
  seatsQty: 4,
  doorsQty: 4,
};

export const wrongID: string = '62c5f913340a5746411d69f2';
export class CarModelMock implements Model<Car> {
  create = async (obj: Car): Promise<CarMockReceived> => {
    return { _id: '62c5f913340a5746411d69f5', ...obj };
  };

  read = async (): Promise<CarMockReceived[]> => {
    return carsMock;
  };

  readOne = async (id: string): Promise<CarMockReceived | null> => {
    if (wrongID === id) {
      return null;
    }

    return carsMock[0];
  };

  update = async (id: string, obj: Car): Promise<CarMockReceived | null> => {
    if (wrongID === id || Object.keys(obj).length === 0) {
      return null;
    }

    return carsMock[0];
  };

  delete = async (id: string): Promise<CarMockReceived | null> => {
    if (wrongID === id) {
      return null;
    }

    return carsMock[0];
  };
}

export class CarServiceMock implements StandardService<Car> {
  create = async (obj: Car): Promise<CarMockReceived | ServiceError | null> => {
    const parsed = JSON.parse(JSON.stringify(CarSchema.safeParse(obj)));

    if (!parsed.success) {
      return { error: parsed.error };
    }

    if (obj.model === 'Error') {
      return null;
    }

    return { _id: '62c5f913340a5746411d69f5', ...obj };
  };

  read = async (): Promise<CarMockReceived[]> => {
    return carsMock;
  };

  readOne = async (id: string): Promise<CarMockReceived | null> => {
    if (wrongID === id) {
      return null;
    }

    return carsMock[0];
  };

  update = async (
    id: string,
    obj: Car,
  ): Promise<CarMockReceived | null | ServiceError> => {
    const parsed = JSON.parse(JSON.stringify(CarSchema.safeParse(obj)));

    if (!parsed.success) {
      return { error: parsed.error };
    }

    if (wrongID === id || Object.keys(obj).length === 0) {
      return null;
    }

    return carsMock[0];
  };

  delete = async (id: string): Promise<CarMockReceived | null> => {
    if (wrongID === id) {
      return null;
    }

    return carsMock[0];
  };
}

export const zodErrorExample = {
  error: {
    issues: [
      {
        code: 'too_small',
        minimum: 1900,
        type: 'number',
        inclusive: true,
        message: 'Value should be greater than or equal to 1900',
        path: ['year'],
      },
    ],
    name: 'ZodError',
  },
};
