import { expect } from 'chai';
import sinon, { SinonStub } from 'sinon';
import CarModel, { carModel as model } from '../../../models/Car';
import {
  carMockSent,
  carMockCreated,
  carsMock,
  carMockUpdated,
} from '../__mocks__/CarMock';
import mongoose from 'mongoose';

describe('Car Model', () => {
  describe('Method create', () => {
    before(() => {
      sinon.stub(mongoose.Model, 'create').resolves(carMockCreated);
    });

    after(() => {
      (mongoose.Model.create as SinonStub).restore();
    });

    it('should create a new car', async () => {
      const carModel = new CarModel(model);
      const carCreated = await carModel.create(carMockSent);

      expect(carCreated).to.be.deep.equal(carMockCreated);
    });
  });

  describe('Method read', () => {
    before(() => sinon.stub(mongoose.Model, 'find').resolves(carsMock));

    after(() => {
      (mongoose.Model.find as SinonStub).restore();
    });

    it('should display all cars', async () => {
      const carModel = new CarModel(model);
      const allCars = await carModel.read();

      expect(allCars).to.be.deep.equal(carsMock);
    });
  });

  describe('Method update', () => {
    before(() =>
      sinon
        .stub(mongoose.Model, 'findOneAndUpdate')
        .onFirstCall()
        .resolves(carsMock[0])
        .onSecondCall()
        .resolves(null),
    );

    after(() => {
      (mongoose.Model.findOneAndUpdate as SinonStub).restore();
    });

    it('should change the car object, but return the old one', async () => {
      const carModel = new CarModel(model);
      const oldCarBeforeUpdate = await carModel.update(
        '62c5f913340a5746411d69f5',
        carMockUpdated,
      );

      expect(oldCarBeforeUpdate).to.be.deep.equal(carsMock[0]);
    });

    it('should return null if the id not exists', async () => {
      const carModel = new CarModel(model);
      const oldCarBeforeUpdate = await carModel.update('error', carMockUpdated);

      expect(oldCarBeforeUpdate).to.be.null;
    });
  });

  describe('Method delete', () => {
    before(() =>
      sinon
        .stub(mongoose.Model, 'findOneAndDelete')
        .onFirstCall()
        .resolves(carsMock[0])
        .onSecondCall()
        .resolves(null),
    );

    after(() => {
      (mongoose.Model.findOneAndDelete as SinonStub).restore();
    });

    it('should delete the car', async () => {
      const carModel = new CarModel(model);
      const carDeleted = await carModel.delete('62c5f913340a5746411d69f5');

      expect(carDeleted).to.be.deep.equal(carsMock[0]);
    });

    it('should return null if the id not exists', async () => {
      const carModel = new CarModel(model);
      const carDeleted = await carModel.delete('error');

      expect(carDeleted).to.be.null;
    });
  });

  describe('Method readOne', () => {
    before(() =>
      sinon
        .stub(mongoose.Model, 'findOne')
        .onFirstCall()
        .resolves(carsMock[0])
        .onSecondCall()
        .resolves(null),
    );

    after(() => {
      (mongoose.Model.findOne as SinonStub).restore();
    });

    it('should get a specific car', async () => {
      const carModel = new CarModel(model);
      const car = await carModel.readOne('62c5f913340a5746411d69f5');

      expect(car).to.be.deep.equal(carsMock[0]);
    });

    it('should return null if the id not exists', async () => {
      const carModel = new CarModel(model);
      const car = await carModel.readOne('error');

      expect(car).to.be.null;
    });
  });
});
