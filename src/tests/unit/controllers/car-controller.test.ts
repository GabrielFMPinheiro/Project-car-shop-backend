import sinon, { SinonStub } from 'sinon';
import { expect } from 'chai';
import CarCrontroller from '../../../controllers/Car';
import {
  carMockCreated,
  carMockSent,
  CarServiceMock,
} from '../__mocks__/CarMock';
import { Request, Response } from 'express';

describe('Car Controller', () => {
  describe('Method create', () => {
    const req = {} as Request;
    const res = {} as Response;

    before(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
    });

    it('should create a new car', async () => {
      req.body = carMockSent;
      const carController = new CarCrontroller(new CarServiceMock());
      await carController.create(req, res);

      expect((res.status as SinonStub).calledWith(201)).to.be.true;
      expect((res.json as SinonStub).calledWith(carMockCreated)).to.be.true;
    });
  });
});
