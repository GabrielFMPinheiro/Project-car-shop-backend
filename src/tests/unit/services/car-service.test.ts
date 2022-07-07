import { expect } from 'chai';
import { carMockSent, carMockCreated } from '../__mocks__/CarMock';
import { CarModelMock } from '../__mocks__/CarMock';
import CarService from '../../../services/Car';

describe('Car Service', () => {
  describe('Method create', () => {
    it('should create a new car', async () => {
      const carService = new CarService(new CarModelMock());
      const carCreated = await carService.create(carMockSent);

      expect(carCreated).to.be.deep.equal(carMockCreated);
    });
  });
});
