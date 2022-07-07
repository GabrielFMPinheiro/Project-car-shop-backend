import { z } from 'zod';
import { VehicleSchema } from './VehicleInterface';

export const MotorcycleSchema = VehicleSchema.merge(
  z.object({
    category: z.enum(['Street', 'Custom', 'Trail']),
    engineCapacity: z.number().gte(1).lte(2500),
  }),
);

export type Motorcycle = z.infer<typeof MotorcycleSchema>;
