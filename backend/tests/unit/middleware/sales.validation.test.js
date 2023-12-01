const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const validationFunctions = require('../../../src/middlewares/createSalesValidation'); 

chai.use(sinonChai);
const { expect } = chai;

describe('Test the validation functions', function () {
  afterEach(function () {
    sinon.restore();
  });

  describe('Test the function productIdSalesValidation', function () {
    it('Should return a 400 error if productId is missing in any product', function () {
      const req = { body: [{ productId: 1 }, { name: 'Product without productId' }] };
      const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
      const next = sinon.stub();

      validationFunctions.productIdSalesValidation(req, res, next);

      expect(res.status).to.have.been.calledWith(400);
      expect(res.json).to.have.been.calledWith({ message: '"productId" is required' });
      expect(next).to.have.not.been.called();
    });

    it('Should call next if all products have productId', function () {
      const req = { body: [{ productId: 1 }, { productId: 2 }] };
      const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
      const next = sinon.stub();

      validationFunctions.productIdSalesValidation(req, res, next);

      expect(res.status).not.to.have.been.called();
      expect(res.json).not.to.have.been.called();
      expect(next).to.have.been.calledOnce();
    });
  });
});