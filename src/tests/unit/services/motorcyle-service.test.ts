import { expect } from 'chai';
import {
  motorcycleMockSent,
  motorcycleMockCreated,
  motorcycleMockBadFormat,
  zodErrorExample,
  motorcyclesMock,
  motorcycleMockUpdated,
  wrongID,
} from '../__mocks__/MotorcycleMock';
import { MotorcycleModelMock } from '../__mocks__/MotorcycleMock';
import MotorcycleService from '../../../services/Motorcycle';

describe('Motorcycle Service', () => {
  describe('Method create', () => {
    it('should create a new motorcycle', async () => {
      const motorcycleService = new MotorcycleService(
        new MotorcycleModelMock(),
      );
      const motorcycleCreated = await motorcycleService.create(
        motorcycleMockSent,
      );

      expect(motorcycleCreated).to.be.deep.equal(motorcycleMockCreated);
    });

    it('should return an error if the motorcycle is not valid', async () => {
      const motorcycleService = new MotorcycleService(
        new MotorcycleModelMock(),
      );
      const motorcycleCreated = await motorcycleService.create(
        motorcycleMockBadFormat,
      );

      expect(motorcycleCreated).to.be.deep.equal(zodErrorExample);
    });
  });

  describe('Method read', () => {
    it('should display all motorcycles', async () => {
      const motorcycleService = new MotorcycleService(
        new MotorcycleModelMock(),
      );
      const allMotorcycles = await motorcycleService.read();

      expect(allMotorcycles).to.be.deep.equal(motorcyclesMock);
    });
  });

  describe('Method update', () => {
    it('should change the motorcycle object, but return the old one', async () => {
      const motorcycleService = new MotorcycleService(
        new MotorcycleModelMock(),
      );
      const oldMotorcycleBeforeUpdate = await motorcycleService.update(
        '62c5f913340a5746411d69f5',
        motorcycleMockUpdated,
      );

      expect(oldMotorcycleBeforeUpdate).to.be.deep.equal(motorcyclesMock[0]);
    });

    it('should return an error if the motorcycle is not valid', async () => {
      const motorcycleService = new MotorcycleService(
        new MotorcycleModelMock(),
      );
      const oldMotorcycleBeforeUpdate = await motorcycleService.update(
        '62c5f913340a5746411d69f5',
        motorcycleMockBadFormat,
      );

      expect(oldMotorcycleBeforeUpdate).to.be.deep.equal(zodErrorExample);
    });
  });

  describe('Method delete', () => {
    it('should delete the motorcycle', async () => {
      const motorcycleService = new MotorcycleService(
        new MotorcycleModelMock(),
      );
      const motorcycleDeleted = await motorcycleService.delete(
        '62c5f913340a5746411d69f5',
      );

      expect(motorcycleDeleted).to.be.deep.equal(motorcyclesMock[0]);
    });

    it("should return null if the motorcycle doesn't exists", async () => {
      const motorcycleService = new MotorcycleService(
        new MotorcycleModelMock(),
      );
      const motorcycleDeleted = await motorcycleService.delete(wrongID);

      expect(motorcycleDeleted).to.be.null;
    });
  });

  describe('Method read one', () => {
    it('should get a specific motorcycle', async () => {
      const motorcycleService = new MotorcycleService(
        new MotorcycleModelMock(),
      );
      const motorcycle = await motorcycleService.readOne(
        '62c5f913340a5746411d69f5',
      );

      expect(motorcycle).to.be.deep.equal(motorcyclesMock[0]);
    });

    it("should return null if the motorcycle doesn't exists", async () => {
      const motorcycleService = new MotorcycleService(
        new MotorcycleModelMock(),
      );
      const motorcycle = await motorcycleService.readOne(wrongID);

      expect(motorcycle).to.be.null;
    });
  });
});
