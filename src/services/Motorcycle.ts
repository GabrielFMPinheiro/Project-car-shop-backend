import {
  Motorcycle,
  MotorcycleSchema,
} from '../interfaces/MotorcycleInterface';
import Service from '../schemas/Service';
import { ServiceError } from '../interfaces/ServiceInterface';
import MotorcycleModel from '../models/Motorcycle';
import { Model } from '../interfaces/ModelInterface';

class MotorcycleService extends Service<Motorcycle> {
  constructor(model: Model<Motorcycle> = new MotorcycleModel()) {
    super(model);
  }

  create = async (
    obj: Motorcycle,
  ): Promise<Motorcycle | ServiceError | null> => {
    const parsed = JSON.parse(JSON.stringify(MotorcycleSchema.safeParse(obj)));

    if (!parsed.success) {
      return { error: parsed.error };
    }
    return this.model.create(obj);
  };

  public async update(
    id: string,
    obj: Motorcycle,
  ): Promise<Motorcycle | ServiceError | null> {
    const parsed = JSON.parse(JSON.stringify(MotorcycleSchema.safeParse(obj)));

    if (!parsed.success) {
      return { error: parsed.error };
    }

    return this.model.update(id, obj);
  }
}

export default MotorcycleService;
