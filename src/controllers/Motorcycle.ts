import { Request, Response } from 'express';
import { isValidObjectId } from 'mongoose';
import Controller, {
  RequestWithBody,
  RequestWithBodyWithParams,
  ResponseError,
} from '../schemas/Controller';
import MotorcycleService from '../services/Motorcycle';
import { Motorcycle } from '../interfaces/MotorcycleInterface';
import { Service as StandardService } from '../interfaces/ServiceInterface';

class MotorcycleController extends Controller<Motorcycle> {
  private _route: string;

  constructor(
    service: StandardService<Motorcycle> = new MotorcycleService(),
    route = '/motorcycles',
  ) {
    super(service);
    this._route = route;
  }

  get route() {
    return this._route;
  }

  create = async (
    req: RequestWithBody<Motorcycle>,
    res: Response<Motorcycle | ResponseError | null>,
  ): Promise<typeof res> => {
    try {
      const { body } = req;
      const motorcycle = await this.service.create(body);

      if (!motorcycle) {
        return res.status(500).json({ error: this.errors.internal });
      }
      if ('error' in motorcycle) {
        return res.status(400).json(motorcycle);
      }
      return res.status(201).json(motorcycle);
    } catch (err) {
      return res.status(500).json({ error: this.errors.internal });
    }
  };

  readOne = async (
    req: Request<{ id: string }>,
    res: Response<Motorcycle | ResponseError>,
  ): Promise<typeof res> => {
    try {
      const { id } = req.params;

      if (!isValidObjectId(id)) {
        return res.status(400).json({ error: this.errors.idBadFormat });
      }

      const motorcycle = await this.service.readOne(id);
      return motorcycle
        ? res.status(200).json(motorcycle)
        : res.status(404).json({ error: this.errors.notFound });
    } catch (error) {
      return res.status(500).json({ error: this.errors.internal });
    }
  };

  update = async (
    req: RequestWithBodyWithParams<Motorcycle>,
    res: Response<Motorcycle | ResponseError>,
  ): Promise<typeof res> => {
    try {
      const { id } = req.params;
      const MotorcycleData = req.body;

      if (!isValidObjectId(id)) {
        return res.status(400).json({ error: this.errors.idBadFormat });
      }
      const motorcycle = await this.service.update(id, MotorcycleData);

      if (motorcycle === null) {
        return res.status(404).json({ error: this.errors.notFound });
      }

      if ('error' in motorcycle) return res.status(400).json(motorcycle);

      return res.status(200).json(motorcycle);
    } catch (err) {
      return res.status(500).json({ error: this.errors.internal });
    }
  };

  delete = async (
    req: Request<{ id: string }>,
    res: Response<'' | ResponseError>,
  ): Promise<typeof res> => {
    try {
      const { id } = req.params;

      if (!isValidObjectId(id)) {
        return res.status(400).json({ error: this.errors.idBadFormat });
      }

      const motorcycle = await this.service.delete(id);

      return motorcycle
        ? res.status(204).json('')
        : res.status(404).json({ error: this.errors.notFound });
    } catch (error) {
      return res.status(500).json({ error: this.errors.internal });
    }
  };
}

export default MotorcycleController;
