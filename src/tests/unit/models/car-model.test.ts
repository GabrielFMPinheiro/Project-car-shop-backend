import { expect } from 'chai';
import sinon, { SinonStub } from 'sinon';
import CarModel, { carModel as model } from '../../../models/Car';
import { carMockSent, carMockCreated } from '../__mocks__/CarMock';

describe('Car Model', () => {
  describe('Method create', () => {
    before(async () => {
      sinon.stub(model, 'create').resolves(carMockCreated);
    });

    after(() => {
      (model.create as SinonStub).restore();
    });

    it('should create a new car', async () => {
      const carModel = new CarModel(model);
      const carCreated = await carModel.create(carMockSent);

      expect(carCreated).to.be.deep.equal(carMockCreated);
    });
  });
});
