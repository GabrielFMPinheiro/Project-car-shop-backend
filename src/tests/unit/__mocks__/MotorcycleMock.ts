import {
  Motorcycle,
  MotorcycleSchema,
} from '../../../interfaces/MotorcycleInterface';
import { Model } from '../../../interfaces/ModelInterface';
import {
  ServiceError,
  Service as StandardService,
} from '../../../interfaces/ServiceInterface';

export interface MotorcycleMockReceived extends Motorcycle {
  _id: string;
}

export const motorcycleMockSent: Motorcycle = {
  model: 'Honda CG Titan 125',
  year: 1963,
  color: 'red',
  buyValue: 3500,
  category: 'Street',
  engineCapacity: 125,
};

export const motorcycleMockBadFormat: Motorcycle = {
  model: 'Honda CG Titan 125',
  year: 1700,
  color: 'red',
  buyValue: 3500,
  category: 'Street',
  engineCapacity: 125,
};

export const motorcycleMockCreated: MotorcycleMockReceived = {
  _id: '4edd40c86762e0fb12000003',
  model: 'Honda CG Titan 125',
  year: 1963,
  color: 'red',
  buyValue: 3500,
  category: 'Street',
  engineCapacity: 125,
};

export const motorcyclesMock: MotorcycleMockReceived[] = [
  {
    _id: '4edd40c86762e0fb12000003',
    model: 'Honda CG Titan 125',
    year: 1963,
    color: 'red',
    buyValue: 3500,
    category: 'Street',
    engineCapacity: 125,
  },
  {
    _id: '4edd40c86762e0fb12000013',
    model: 'Yamaha Fazes 250',
    year: 1963,
    color: 'red',
    buyValue: 3500,
    category: 'Street',
    engineCapacity: 125,
  },
];

export const motorcycleMockUpdated: Motorcycle = {
  model: 'Honda CG Titan 125',
  year: 1963,
  color: 'red',
  buyValue: 3500,
  category: 'Street',
  engineCapacity: 150,
};

export const wrongID: string = '62c5f913340a5746411d69f2';

export class MotorcycleModelMock implements Model<Motorcycle> {
  create = async (obj: Motorcycle): Promise<MotorcycleMockReceived> => {
    return { _id: '4edd40c86762e0fb12000003', ...obj };
  };

  read = async (): Promise<MotorcycleMockReceived[]> => {
    return motorcyclesMock;
  };

  readOne = async (id: string): Promise<MotorcycleMockReceived | null> => {
    if (wrongID === id) {
      return null;
    }

    return motorcyclesMock[0];
  };

  update = async (
    id: string,
    obj: Motorcycle,
  ): Promise<MotorcycleMockReceived | null> => {
    if (wrongID === id || Object.keys(obj).length === 0) {
      return null;
    }

    return motorcyclesMock[0];
  };

  delete = async (id: string): Promise<MotorcycleMockReceived | null> => {
    if (wrongID === id) {
      return null;
    }

    return motorcyclesMock[0];
  };
}

export class MotorcycleServiceMock implements StandardService<Motorcycle> {
  create = async (
    obj: Motorcycle,
  ): Promise<MotorcycleMockReceived | ServiceError | null> => {
    const parsed = JSON.parse(JSON.stringify(MotorcycleSchema.safeParse(obj)));

    if (!parsed.success) {
      return { error: parsed.error };
    }

    if (obj.model === 'Error') {
      return null;
    }

    return { _id: '4edd40c86762e0fb12000003', ...obj };
  };

  read = async (): Promise<MotorcycleMockReceived[]> => {
    return motorcyclesMock;
  };

  readOne = async (id: string): Promise<MotorcycleMockReceived | null> => {
    if (wrongID === id) {
      return null;
    }

    return motorcyclesMock[0];
  };

  update = async (
    id: string,
    obj: Motorcycle,
  ): Promise<MotorcycleMockReceived | null | ServiceError> => {
    const parsed = JSON.parse(JSON.stringify(MotorcycleSchema.safeParse(obj)));

    if (!parsed.success) {
      return { error: parsed.error };
    }

    if (wrongID === id || Object.keys(obj).length === 0) {
      return null;
    }

    return motorcyclesMock[0];
  };

  delete = async (id: string): Promise<MotorcycleMockReceived | null> => {
    if (wrongID === id) {
      return null;
    }

    return motorcyclesMock[0];
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
