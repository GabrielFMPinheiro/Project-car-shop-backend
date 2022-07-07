import { Car, CarSchema } from '../interfaces/CarInterface';
import Service from '../schemas/Service';
import { ServiceError } from '../interfaces/ServiceInterface';
import CarModel from '../models/Car';
import { Model } from '../interfaces/ModelInterface';

class CarService extends Service<Car> {
  constructor(model: Model<Car> = new CarModel()) {
    super(model);
  }

  create = async (obj: Car): Promise<Car | ServiceError | null> => {
    const parsed = JSON.parse(JSON.stringify(CarSchema.safeParse(obj)));

    if (!parsed.success) {
      return { error: parsed.error };
    }
    return this.model.create(obj);
  };

  public async update(
    id: string,
    obj: Car,
  ): Promise<Car | ServiceError | null> {
    const parsed = JSON.parse(JSON.stringify(CarSchema.safeParse(obj)));

    if (!parsed.success) {
      return { error: parsed.error };
    }

    return this.model.update(id, obj);
  }
}

export default CarService;
