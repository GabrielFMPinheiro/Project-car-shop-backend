import sinon, { SinonStub } from 'sinon';
import { expect } from 'chai';
import CarCrontroller from '../../../controllers/Car';
import {
  carMockBadFormat,
  carMockCreated,
  carMockSent,
  carMockUpdated,
  CarServiceMock,
  carsMock,
  wrongID,
  zodErrorExample,
} from '../__mocks__/CarMock';
import { Request, Response } from 'express';
import { RequestWithBodyWithParams } from '../../../schemas/Controller';
import { Car } from '../../../interfaces/CarInterface';

describe('Car Controller', () => {
  describe('Method create', () => {
    const req = {} as Request;
    const res = {} as Response;

    before(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
    });

    afterEach(() => {
      req.body = {};
      req.params = {};
    });

    it('should create a new car', async () => {
      req.body = carMockSent;
      const carController = new CarCrontroller(new CarServiceMock());
      await carController.create(req, res);

      expect((res.status as SinonStub).calledWith(201)).to.be.true;
      expect((res.json as SinonStub).calledWith(carMockCreated)).to.be.true;
    });

    it('should return an error if the car is not valid', async () => {
      req.body = carMockBadFormat;
      const carController = new CarCrontroller(new CarServiceMock());
      await carController.create(req, res);

      expect((res.status as SinonStub).calledWith(400)).to.be.true;
      expect((res.json as SinonStub).calledWith(zodErrorExample)).to.be.true;
    });

    it('should return an internal error if something goes wrong', async () => {
      req.body = { ...carMockBadFormat, model: 'Error', year: 2000 };

      const carController = new CarCrontroller(new CarServiceMock());
      await carController.create(req, res);

      expect((res.status as SinonStub).calledWith(500)).to.be.true;
      expect(
        (res.json as SinonStub).calledWith({ error: 'Internal Server Error' }),
      ).to.be.true;
    });

    it('should return an internal error if the car is not created by database', async () => {
      req.body = { ...carMockBadFormat, model: 'Error', year: 2000 };

      const carController = new CarCrontroller(new CarServiceMock());
      await carController.create(req, res);

      expect((res.status as SinonStub).calledWith(500)).to.be.true;
      expect(
        (res.json as SinonStub).calledWith({ error: 'Internal Server Error' }),
      ).to.be.true;
    });

    it('should return an internal error if something not mapped has happened', async () => {
      const CarServiceMockInternalError = new CarServiceMock();
      CarServiceMockInternalError.create = () => {
        throw new Error('Internal Server Error');
      };

      const carController = new CarCrontroller(CarServiceMockInternalError);
      carController.create(req, res);

      expect((res.status as SinonStub).calledWith(500)).to.be.true;
      expect(
        (res.json as SinonStub).calledWith({ error: 'Internal Server Error' }),
      ).to.be.true;
    });
  });

  describe('Method read', () => {
    const req = {} as Request;
    const res = {} as Response;

    before(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
    });

    afterEach(() => {
      req.body = {};
    });

    it('should display all cars', async () => {
      const carController = new CarCrontroller(new CarServiceMock());
      await carController.read(req, res);

      expect((res.status as SinonStub).calledWith(200)).to.be.true;
      expect((res.json as SinonStub).calledWith(carsMock)).to.be.true;
    });

    it('should return an internal error if something not mapped has happened', async () => {
      const CarServiceMockInternalError = new CarServiceMock();
      CarServiceMockInternalError.read = () => {
        throw new Error('Internal Server Error');
      };

      const carController = new CarCrontroller(CarServiceMockInternalError);
      carController.read(req, res);

      expect((res.status as SinonStub).calledWith(500)).to.be.true;
      expect(
        (res.json as SinonStub).calledWith({ error: 'Internal Server Error' }),
      ).to.be.true;
    });
  });

  describe('Method update', () => {
    const req = {} as RequestWithBodyWithParams<Car>;
    const res = {} as Response;

    before(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
    });

    it('should update a car', async () => {
      req.body = carMockUpdated;
      req.params = { id: '62c5f913340a5746411d69f7' };

      const carController = new CarCrontroller(new CarServiceMock());
      await carController.update(req, res);

      expect((res.status as SinonStub).calledWith(200)).to.be.true;
      expect((res.json as SinonStub).calledWith(carsMock[0])).to.be.true;
    });

    it('should return an error if the car is not valid', async () => {
      req.body = carMockBadFormat;
      req.params = { id: '62c5f913340a5746411d69f7' };

      const carController = new CarCrontroller(new CarServiceMock());
      await carController.update(req, res);

      expect((res.status as SinonStub).calledWith(400)).to.be.true;
      expect((res.json as SinonStub).calledWith(zodErrorExample)).to.be.true;
    });

    it('should return an error if the id is not valid', async () => {
      req.params = { id: 'error' };

      const carController = new CarCrontroller(new CarServiceMock());
      await carController.update(req, res);

      expect((res.status as SinonStub).calledWith(400)).to.be.true;
      expect(
        (res.json as SinonStub).calledWith({
          error: 'Id must have 24 hexadecimal characters',
        }),
      ).to.be.true;
    });

    it('should return not found if the id does not exist', async () => {
      req.params = { id: wrongID };
      req.body = carMockUpdated;

      const carController = new CarCrontroller(new CarServiceMock());
      await carController.update(req, res);

      expect((res.status as SinonStub).calledWith(404)).to.be.true;
      expect(
        (res.json as SinonStub).calledWith({
          error: 'Object not found',
        }),
      ).to.be.true;
    });

    it('should return an internal error if something not mapped has happened', async () => {
      const CarServiceMockInternalError = new CarServiceMock();
      CarServiceMockInternalError.update = () => {
        throw new Error('Internal Server Error');
      };

      const carController = new CarCrontroller(CarServiceMockInternalError);
      carController.update(req, res);

      expect((res.status as SinonStub).calledWith(500)).to.be.true;
      expect(
        (res.json as SinonStub).calledWith({ error: 'Internal Server Error' }),
      ).to.be.true;
    });
  });

  describe('Method delete', () => {
    const req = {} as RequestWithBodyWithParams<Car>;
    const res = {} as Response;

    before(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
    });

    it('should delete a car', async () => {
      req.params = { id: '62c5f913340a5746411d69f7' };

      const carController = new CarCrontroller(new CarServiceMock());
      await carController.delete(req, res);

      expect((res.status as SinonStub).calledWith(204)).to.be.true;
      expect((res.json as SinonStub).calledWith('')).to.be.true;
    });

    it('should return an error if the id is not valid', async () => {
      req.params = { id: 'error' };

      const carController = new CarCrontroller(new CarServiceMock());
      await carController.delete(req, res);

      expect((res.status as SinonStub).calledWith(400)).to.be.true;
      expect(
        (res.json as SinonStub).calledWith({
          error: 'Id must have 24 hexadecimal characters',
        }),
      ).to.be.true;
    });

    it('should return an not found if the id does not exist', async () => {
      req.params = { id: wrongID };

      const carController = new CarCrontroller(new CarServiceMock());
      await carController.delete(req, res);

      expect((res.status as SinonStub).calledWith(404)).to.be.true;
      expect(
        (res.json as SinonStub).calledWith({
          error: 'Object not found',
        }),
      ).to.be.true;
    });

    it('should return an internal error if something not mapped has happened', async () => {
      const CarServiceMockInternalError = new CarServiceMock();
      CarServiceMockInternalError.delete = () => {
        throw new Error('Internal Server Error');
      };

      const carController = new CarCrontroller(CarServiceMockInternalError);
      carController.delete(req, res);

      expect((res.status as SinonStub).calledWith(500)).to.be.true;
      expect(
        (res.json as SinonStub).calledWith({ error: 'Internal Server Error' }),
      ).to.be.true;
    });
  });

  describe('Method read one', () => {
    const req = {} as RequestWithBodyWithParams<Car>;
    const res = {} as Response;

    before(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
    });

    it('should get a specific car', async () => {
      req.params = { id: '62c5f913340a5746411d69f7' };

      const carController = new CarCrontroller(new CarServiceMock());
      await carController.readOne(req, res);

      expect((res.status as SinonStub).calledWith(200)).to.be.true;
      expect((res.json as SinonStub).calledWith(carsMock[0])).to.be.true;
    });

    it('should return an error if the id is not valid', async () => {
      req.params = { id: 'error' };

      const carController = new CarCrontroller(new CarServiceMock());
      await carController.readOne(req, res);

      expect((res.status as SinonStub).calledWith(400)).to.be.true;
      expect(
        (res.json as SinonStub).calledWith({
          error: 'Id must have 24 hexadecimal characters',
        }),
      ).to.be.true;
    });

    it('should return an not found if the id does not exist', async () => {
      req.params = { id: wrongID };

      const carController = new CarCrontroller(new CarServiceMock());
      await carController.readOne(req, res);

      expect((res.status as SinonStub).calledWith(404)).to.be.true;
      expect(
        (res.json as SinonStub).calledWith({
          error: 'Object not found',
        }),
      ).to.be.true;
    });

    it('should return an internal error if something not mapped has happened', async () => {
      const CarServiceMockInternalError = new CarServiceMock();
      CarServiceMockInternalError.readOne = () => {
        throw new Error('Internal Server Error');
      };

      const carController = new CarCrontroller(CarServiceMockInternalError);
      carController.readOne(req, res);

      expect((res.status as SinonStub).calledWith(500)).to.be.true;
      expect(
        (res.json as SinonStub).calledWith({ error: 'Internal Server Error' }),
      ).to.be.true;
    });
  });

  describe('Method get route', () => {
    it('should return the route passed to the constructor', async () => {
      const carController = new CarCrontroller(new CarServiceMock());
      const route = carController.route;

      expect(route).to.be.equal('/cars');
    });
  });
});
