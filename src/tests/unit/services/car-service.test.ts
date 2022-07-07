import { expect } from 'chai';
import {
  carMockSent,
  carMockCreated,
  carMockBadFormat,
  zodErrorExample,
  carsMock,
  carMockUpdated,
  wrongID,
} from '../__mocks__/CarMock';
import { CarModelMock } from '../__mocks__/CarMock';
import CarService from '../../../services/Car';

describe('Car Service', () => {
  describe('Method create', () => {
    it('should create a new car', async () => {
      const carService = new CarService(new CarModelMock());
      const carCreated = await carService.create(carMockSent);

      expect(carCreated).to.be.deep.equal(carMockCreated);
    });

    it('should return an error if the car is not valid', async () => {
      const carService = new CarService(new CarModelMock());
      const carCreated = await carService.create(carMockBadFormat);

      expect(carCreated).to.be.deep.equal(zodErrorExample);
    });
  });

  describe('Method read', () => {
    it('should display all cars', async () => {
      const carService = new CarService(new CarModelMock());
      const allCars = await carService.read();

      expect(allCars).to.be.deep.equal(carsMock);
    });
  });

  describe('Method update', () => {
    it('should change the car object, but return the old one', async () => {
      const carService = new CarService(new CarModelMock());
      const oldCarBeforeUpdate = await carService.update(
        '62c5f913340a5746411d69f5',
        carMockUpdated,
      );

      expect(oldCarBeforeUpdate).to.be.deep.equal(carsMock[0]);
    });

    it('should return an error if the car is not valid', async () => {
      const carService = new CarService(new CarModelMock());
      const oldCarBeforeUpdate = await carService.update(
        '62c5f913340a5746411d69f5',
        carMockBadFormat,
      );

      expect(oldCarBeforeUpdate).to.be.deep.equal(zodErrorExample);
    });
  });

  describe('Method delete', () => {
    it('should delete the car', async () => {
      const carService = new CarService(new CarModelMock());
      const carDeleted = await carService.delete('62c5f913340a5746411d69f5');

      expect(carDeleted).to.be.deep.equal(carsMock[0]);
    });

    it("should return null if the car doesn't exists", async () => {
      const carService = new CarService(new CarModelMock());
      const carDeleted = await carService.delete(wrongID);

      expect(carDeleted).to.be.null;
    });
  });

  describe('Method read one', () => {
    it('should get a specific car', async () => {
      const carService = new CarService(new CarModelMock());
      const car = await carService.readOne('62c5f913340a5746411d69f5');

      expect(car).to.be.deep.equal(carsMock[0]);
    });

    it("should return null if the car doesn't exists", async () => {
      const carService = new CarService(new CarModelMock());
      const car = await carService.readOne(wrongID);

      expect(car).to.be.null;
    });
  });
});
