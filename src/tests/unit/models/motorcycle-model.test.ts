import { expect } from 'chai';
import sinon, { SinonStub } from 'sinon';
import MotorcycleModel, {
  motorcycleModel as model,
} from '../../../models/Motorcycle';
import {
  motorcycleMockSent,
  motorcycleMockCreated,
  motorcyclesMock,
  motorcycleMockUpdated,
} from '../__mocks__/MotorcycleMock';
import mongoose from 'mongoose';

describe('Motorcycle Model', () => {
  describe('Method create', () => {
    before(() => {
      sinon.stub(mongoose.Model, 'create').resolves(motorcycleMockCreated);
    });

    after(() => {
      (mongoose.Model.create as SinonStub).restore();
    });

    it('should create a new motorcycle', async () => {
      const motorcycleModel = new MotorcycleModel(model);
      const motorcycleCreated = await motorcycleModel.create(
        motorcycleMockSent,
      );

      expect(motorcycleCreated).to.be.deep.equal(motorcycleMockCreated);
    });
  });

  describe('Method read', () => {
    before(() => sinon.stub(mongoose.Model, 'find').resolves(motorcyclesMock));

    after(() => {
      (mongoose.Model.find as SinonStub).restore();
    });

    it('should display all motorcycles', async () => {
      const motorcycleModel = new MotorcycleModel(model);
      const allMotorcycles = await motorcycleModel.read();

      expect(allMotorcycles).to.be.deep.equal(motorcyclesMock);
    });
  });

  describe('Method update', () => {
    before(() =>
      sinon
        .stub(mongoose.Model, 'findOneAndUpdate')
        .onFirstCall()
        .resolves(motorcyclesMock[0])
        .onSecondCall()
        .resolves(null),
    );

    after(() => {
      (mongoose.Model.findOneAndUpdate as SinonStub).restore();
    });

    it('should change the motorcycle object, but return the old one', async () => {
      const motorcycleModel = new MotorcycleModel(model);
      const oldMotorcycleBeforeUpdate = await motorcycleModel.update(
        '62c5f913340a5746411d69f5',
        motorcycleMockUpdated,
      );

      expect(oldMotorcycleBeforeUpdate).to.be.deep.equal(motorcyclesMock[0]);
    });

    it('should return null if the id not exists', async () => {
      const motorcycleModel = new MotorcycleModel(model);
      const oldMotorcycleBeforeUpdate = await motorcycleModel.update(
        'error',
        motorcycleMockUpdated,
      );

      expect(oldMotorcycleBeforeUpdate).to.be.null;
    });
  });

  describe('Method delete', () => {
    before(() =>
      sinon
        .stub(mongoose.Model, 'findOneAndDelete')
        .onFirstCall()
        .resolves(motorcyclesMock[0])
        .onSecondCall()
        .resolves(null),
    );

    after(() => {
      (mongoose.Model.findOneAndDelete as SinonStub).restore();
    });

    it('should delete the motorcycle', async () => {
      const motorcycleModel = new MotorcycleModel(model);
      const motorcycleDeleted = await motorcycleModel.delete(
        '62c5f913340a5746411d69f5',
      );

      expect(motorcycleDeleted).to.be.deep.equal(motorcyclesMock[0]);
    });

    it('should return null if the id not exists', async () => {
      const motorcycleModel = new MotorcycleModel(model);
      const motorcycleDeleted = await motorcycleModel.delete('error');

      expect(motorcycleDeleted).to.be.null;
    });
  });

  describe('Method readOne', () => {
    before(() =>
      sinon
        .stub(mongoose.Model, 'findOne')
        .onFirstCall()
        .resolves(motorcyclesMock[0])
        .onSecondCall()
        .resolves(null),
    );

    after(() => {
      (mongoose.Model.findOne as SinonStub).restore();
    });

    it('should get a specific motorcycle', async () => {
      const motorcycleModel = new MotorcycleModel(model);
      const motorcycle = await motorcycleModel.readOne(
        '62c5f913340a5746411d69f5',
      );

      expect(motorcycle).to.be.deep.equal(motorcyclesMock[0]);
    });

    it('should return null if the id not exists', async () => {
      const motorcycleModel = new MotorcycleModel(model);
      const motorcycle = await motorcycleModel.readOne('error');

      expect(motorcycle).to.be.null;
    });
  });
});
