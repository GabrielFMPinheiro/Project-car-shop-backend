import { ZodError } from 'zod';

export interface ServiceError {
  error: ZodError;
}

export interface Service<T> {
  create(obj: T): Promise<T | null | ServiceError>;
  read(): Promise<T[]>;
  readOne(id_: string): Promise<T | null>;
  update(id_: string, obj: T): Promise<T | ServiceError | null>;
  delete(id_: string): Promise<T | null>;
}
