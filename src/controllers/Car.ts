import { Request, Response } from 'express';
import { isValidObjectId } from 'mongoose';
import Controller, {
  RequestWithBody,
  RequestWithBodyWithParams,
  ResponseError,
} from '../schemas/Controller';
import CarService from '../services/Car';
import { Car } from '../interfaces/CarInterface';
import { Service as StandardService } from '../interfaces/ServiceInterface';

class CarController extends Controller<Car> {
  private _route: string;

  constructor(
    service: StandardService<Car> = new CarService(),
    route = '/cars',
  ) {
    super(service);
    this._route = route;
  }

  get route() {
    return this._route;
  }

  create = async (
    req: RequestWithBody<Car>,
    res: Response<Car | ResponseError | null>,
  ): Promise<typeof res> => {
    try {
      const { body } = req;
      const car = await this.service.create(body);

      if (!car) {
        return res.status(500).json({ error: this.errors.internal });
      }
      if ('error' in car) {
        return res.status(400).json(car);
      }
      return res.status(201).json(car);
    } catch (err) {
      return res.status(500).json({ error: this.errors.internal });
    }
  };

  readOne = async (
    req: Request<{ id: string }>,
    res: Response<Car | ResponseError>,
  ): Promise<typeof res> => {
    try {
      const { id } = req.params;

      if (!isValidObjectId(id)) {
        return res.status(400).json({ error: this.errors.idBadFormat });
      }

      const car = await this.service.readOne(id);
      return car
        ? res.status(200).json(car)
        : res.status(404).json({ error: this.errors.notFound });
    } catch (error) {
      return res.status(500).json({ error: this.errors.internal });
    }
  };

  update = async (
    req: RequestWithBodyWithParams<Car>,
    res: Response<Car | ResponseError>,
  ): Promise<typeof res> => {
    try {
      const { id } = req.params;
      const carData = req.body;

      if (!isValidObjectId(id)) {
        return res.status(400).json({ error: this.errors.idBadFormat });
      }

      const car = await this.service.update(id, carData);

      if (car === null) {
        return res.status(404).json({ error: this.errors.notFound });
      }

      if ('error' in car) return res.status(400).json(car);

      return res.status(200).json(car);
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

      const car = await this.service.delete(id);

      return car
        ? res.status(204).json('')
        : res.status(404).json({ error: this.errors.notFound });
    } catch (error) {
      return res.status(500).json({ error: this.errors.internal });
    }
  };
}

export default CarController;
