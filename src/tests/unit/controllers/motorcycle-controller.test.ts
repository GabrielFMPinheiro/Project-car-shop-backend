import sinon, { SinonStub } from 'sinon';
import { expect } from 'chai';
import MotorcycleCrontroller from '../../../controllers/Motorcycle';
import {
  motorcycleMockBadFormat,
  motorcycleMockCreated,
  motorcycleMockSent,
  motorcycleMockUpdated,
  MotorcycleServiceMock,
  motorcyclesMock,
  wrongID,
  zodErrorExample,
} from '../__mocks__/MotorcycleMock';
import { Request, Response } from 'express';
import { RequestWithBodyWithParams } from '../../../schemas/Controller';
import { Motorcycle } from '../../../interfaces/MotorcycleInterface';

describe('Motorcycle Controller', () => {
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

    it('should create a new motorcycle', async () => {
      req.body = motorcycleMockSent;
      const motorcycleController = new MotorcycleCrontroller(
        new MotorcycleServiceMock(),
      );
      await motorcycleController.create(req, res);

      expect((res.status as SinonStub).calledWith(201)).to.be.true;
      expect((res.json as SinonStub).calledWith(motorcycleMockCreated)).to.be
        .true;
    });

    it('should return an error if the motorcycle is not valid', async () => {
      req.body = motorcycleMockBadFormat;
      const motorcycleController = new MotorcycleCrontroller(
        new MotorcycleServiceMock(),
      );
      await motorcycleController.create(req, res);

      expect((res.status as SinonStub).calledWith(400)).to.be.true;
      expect((res.json as SinonStub).calledWith(zodErrorExample)).to.be.true;
    });

    it('should return an internal error if something goes wrong', async () => {
      req.body = { ...motorcycleMockBadFormat, model: 'Error', year: 2000 };

      const motorcycleController = new MotorcycleCrontroller(
        new MotorcycleServiceMock(),
      );
      await motorcycleController.create(req, res);

      expect((res.status as SinonStub).calledWith(500)).to.be.true;
      expect(
        (res.json as SinonStub).calledWith({ error: 'Internal Server Error' }),
      ).to.be.true;
    });

    it('should return an internal error if the motorcycle is not created by database', async () => {
      req.body = { ...motorcycleMockBadFormat, model: 'Error', year: 2000 };

      const motorcycleController = new MotorcycleCrontroller(
        new MotorcycleServiceMock(),
      );
      await motorcycleController.create(req, res);

      expect((res.status as SinonStub).calledWith(500)).to.be.true;
      expect(
        (res.json as SinonStub).calledWith({ error: 'Internal Server Error' }),
      ).to.be.true;
    });

    it('should return an internal error if something not mapped has happened', async () => {
      const MotorcycleServiceMockInternalError = new MotorcycleServiceMock();
      MotorcycleServiceMockInternalError.create = () => {
        throw new Error('Internal Server Error');
      };

      const motorcycleController = new MotorcycleCrontroller(
        MotorcycleServiceMockInternalError,
      );
      motorcycleController.create(req, res);

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

    it('should display all motorcycles', async () => {
      const motorcycleController = new MotorcycleCrontroller(
        new MotorcycleServiceMock(),
      );
      await motorcycleController.read(req, res);

      expect((res.status as SinonStub).calledWith(200)).to.be.true;
      expect((res.json as SinonStub).calledWith(motorcyclesMock)).to.be.true;
    });

    it('should return an internal error if something not mapped has happened', async () => {
      const MotorcycleServiceMockInternalError = new MotorcycleServiceMock();
      MotorcycleServiceMockInternalError.read = () => {
        throw new Error('Internal Server Error');
      };

      const motorcycleController = new MotorcycleCrontroller(
        MotorcycleServiceMockInternalError,
      );
      motorcycleController.read(req, res);

      expect((res.status as SinonStub).calledWith(500)).to.be.true;
      expect(
        (res.json as SinonStub).calledWith({ error: 'Internal Server Error' }),
      ).to.be.true;
    });
  });

  describe('Method update', () => {
    const req = {} as RequestWithBodyWithParams<Motorcycle>;
    const res = {} as Response;

    before(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
    });

    it('should update a motorcycle', async () => {
      req.body = motorcycleMockUpdated;
      req.params = { id: '62c5f913340a5746411d69f7' };

      const motorcycleController = new MotorcycleCrontroller(
        new MotorcycleServiceMock(),
      );
      await motorcycleController.update(req, res);

      expect((res.status as SinonStub).calledWith(200)).to.be.true;
      expect((res.json as SinonStub).calledWith(motorcyclesMock[0])).to.be.true;
    });

    it('should return an error if the motorcycle is not valid', async () => {
      req.body = motorcycleMockBadFormat;
      req.params = { id: '62c5f913340a5746411d69f7' };

      const motorcycleController = new MotorcycleCrontroller(
        new MotorcycleServiceMock(),
      );
      await motorcycleController.update(req, res);

      expect((res.status as SinonStub).calledWith(400)).to.be.true;
      expect((res.json as SinonStub).calledWith(zodErrorExample)).to.be.true;
    });

    it('should return an error if the id is not valid', async () => {
      req.params = { id: 'error' };

      const motorcycleController = new MotorcycleCrontroller(
        new MotorcycleServiceMock(),
      );
      await motorcycleController.update(req, res);

      expect((res.status as SinonStub).calledWith(400)).to.be.true;
      expect(
        (res.json as SinonStub).calledWith({
          error: 'Id must have 24 hexadecimal characters',
        }),
      ).to.be.true;
    });

    it('should return not found if the id does not exist', async () => {
      req.params = { id: wrongID };
      req.body = motorcycleMockUpdated;

      const motorcycleController = new MotorcycleCrontroller(
        new MotorcycleServiceMock(),
      );
      await motorcycleController.update(req, res);

      expect((res.status as SinonStub).calledWith(404)).to.be.true;
      expect(
        (res.json as SinonStub).calledWith({
          error: 'Object not found',
        }),
      ).to.be.true;
    });

    it('should return an internal error if something not mapped has happened', async () => {
      const MotorcycleServiceMockInternalError = new MotorcycleServiceMock();
      MotorcycleServiceMockInternalError.update = () => {
        throw new Error('Internal Server Error');
      };

      const motorcycleController = new MotorcycleCrontroller(
        MotorcycleServiceMockInternalError,
      );
      motorcycleController.update(req, res);

      expect((res.status as SinonStub).calledWith(500)).to.be.true;
      expect(
        (res.json as SinonStub).calledWith({ error: 'Internal Server Error' }),
      ).to.be.true;
    });
  });

  describe('Method delete', () => {
    const req = {} as RequestWithBodyWithParams<Motorcycle>;
    const res = {} as Response;

    before(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
    });

    it('should delete a motorcycle', async () => {
      req.params = { id: '62c5f913340a5746411d69f7' };

      const motorcycleController = new MotorcycleCrontroller(
        new MotorcycleServiceMock(),
      );
      await motorcycleController.delete(req, res);

      expect((res.status as SinonStub).calledWith(204)).to.be.true;
      expect((res.json as SinonStub).calledWith('')).to.be.true;
    });

    it('should return an error if the id is not valid', async () => {
      req.params = { id: 'error' };

      const motorcycleController = new MotorcycleCrontroller(
        new MotorcycleServiceMock(),
      );
      await motorcycleController.delete(req, res);

      expect((res.status as SinonStub).calledWith(400)).to.be.true;
      expect(
        (res.json as SinonStub).calledWith({
          error: 'Id must have 24 hexadecimal characters',
        }),
      ).to.be.true;
    });

    it('should return an not found if the id does not exist', async () => {
      req.params = { id: wrongID };

      const motorcycleController = new MotorcycleCrontroller(
        new MotorcycleServiceMock(),
      );
      await motorcycleController.delete(req, res);

      expect((res.status as SinonStub).calledWith(404)).to.be.true;
      expect(
        (res.json as SinonStub).calledWith({
          error: 'Object not found',
        }),
      ).to.be.true;
    });

    it('should return an internal error if something not mapped has happened', async () => {
      const MotorcycleServiceMockInternalError = new MotorcycleServiceMock();
      MotorcycleServiceMockInternalError.delete = () => {
        throw new Error('Internal Server Error');
      };

      const motorcycleController = new MotorcycleCrontroller(
        MotorcycleServiceMockInternalError,
      );
      motorcycleController.delete(req, res);

      expect((res.status as SinonStub).calledWith(500)).to.be.true;
      expect(
        (res.json as SinonStub).calledWith({ error: 'Internal Server Error' }),
      ).to.be.true;
    });
  });

  describe('Method read one', () => {
    const req = {} as RequestWithBodyWithParams<Motorcycle>;
    const res = {} as Response;

    before(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
    });

    it('should get a specific motorcycle', async () => {
      req.params = { id: '62c5f913340a5746411d69f7' };

      const motorcycleController = new MotorcycleCrontroller(
        new MotorcycleServiceMock(),
      );
      await motorcycleController.readOne(req, res);

      expect((res.status as SinonStub).calledWith(200)).to.be.true;
      expect((res.json as SinonStub).calledWith(motorcyclesMock[0])).to.be.true;
    });

    it('should return an error if the id is not valid', async () => {
      req.params = { id: 'error' };

      const motorcycleController = new MotorcycleCrontroller(
        new MotorcycleServiceMock(),
      );
      await motorcycleController.readOne(req, res);

      expect((res.status as SinonStub).calledWith(400)).to.be.true;
      expect(
        (res.json as SinonStub).calledWith({
          error: 'Id must have 24 hexadecimal characters',
        }),
      ).to.be.true;
    });

    it('should return an not found if the id does not exist', async () => {
      req.params = { id: wrongID };

      const motorcycleController = new MotorcycleCrontroller(
        new MotorcycleServiceMock(),
      );
      await motorcycleController.readOne(req, res);

      expect((res.status as SinonStub).calledWith(404)).to.be.true;
      expect(
        (res.json as SinonStub).calledWith({
          error: 'Object not found',
        }),
      ).to.be.true;
    });

    it('should return an internal error if something not mapped has happened', async () => {
      const MotorcycleServiceMockInternalError = new MotorcycleServiceMock();
      MotorcycleServiceMockInternalError.readOne = () => {
        throw new Error('Internal Server Error');
      };

      const motorcycleController = new MotorcycleCrontroller(
        MotorcycleServiceMockInternalError,
      );
      motorcycleController.readOne(req, res);

      expect((res.status as SinonStub).calledWith(500)).to.be.true;
      expect(
        (res.json as SinonStub).calledWith({ error: 'Internal Server Error' }),
      ).to.be.true;
    });
  });

  describe('Method get route', () => {
    it('should return the route passed to the constructor', async () => {
      const motorcycleController = new MotorcycleCrontroller(
        new MotorcycleServiceMock(),
      );
      const route = motorcycleController.route;

      expect(route).to.be.equal('/motorcycles');
    });
  });
});
