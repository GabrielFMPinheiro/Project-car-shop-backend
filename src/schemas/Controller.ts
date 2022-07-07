import { Request, Response } from 'express';
import { Service as StandardService } from '../interfaces/ServiceInterface';

export type ResponseError = {
  error: unknown;
};

export interface RequestWithBody<T> extends Request {
  body: T;
}

export interface RequestWithBodyWithParams<T> extends Request {
  params: { id: string };
  body: T;
}

enum ControllerErrors {
  internal = 'Internal Server Error',
  notFound = 'Object not found',
  requiredId = 'Id is required',
  bodyBadFormat = 'Body is not valid',
  idBadFormat = 'Id must have 24 hexadecimal characters',
  badRequest = 'Bad request',
}

abstract class Controller<T> {
  abstract route: string;

  protected errors = ControllerErrors;

  constructor(protected service: StandardService<T>) {}

  abstract create(
    req: RequestWithBody<T>,
    res: Response<T | ResponseError | null>,
  ): Promise<typeof res>;

  read = async (
    _req: Request,
    res: Response<T[] | ResponseError>,
  ): Promise<typeof res> => {
    try {
      const objs = await this.service.read();
      return res.status(200).json(objs);
    } catch (err) {
      return res.status(500).json({ error: this.errors.internal });
    }
  };

  abstract readOne(
    req: Request<{ id: string }>,
    res: Response<T | ResponseError>,
  ): Promise<typeof res>;

  abstract update(
    req: RequestWithBodyWithParams<T>,
    res: Response<T | ResponseError>,
  ): Promise<typeof res>;

  abstract delete(
    req: Request<{ id: string }>,
    res: Response<'' | ResponseError>,
  ): Promise<typeof res>;
}
export default Controller;
