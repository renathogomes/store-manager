const sinon = require('sinon');
const { expect } = require('chai');
const {
  productIdSalesValidation,
  quantitySalesValidation,
  quantitySalesValidation2,
} = require('../../../src/middlewares/createSalesValidation');

describe('createSalesValidation', function () {
  it('should return 400 if productId is not provided', function () {
    const req = { body: [{ productId: undefined }] };
    const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
    const next = sinon.stub();

    productIdSalesValidation(req, res, next);

    expect(res.status.calledWith(400)).to.equal(true);
    expect(res.json.calledWith({ message: '"productId" is required' })).to.equal(true);
    expect(next.called).to.equal(false);
  });

  it('should return 400 if quantity is not provided', function () {
    const req = { body: [{ quantity: undefined }] };
    const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
    const next = sinon.stub();

    quantitySalesValidation(req, res, next);

    expect(res.status.calledWith(400)).to.equal(true);
    expect(res.json.calledWith({ message: '"quantity" is required' })).to.equal(true);
    expect(next.called).to.equal(false);
  });

  it('should return 422 if quantity is less than or equal to 0', function () {
    const req = { body: [{ quantity: 0 }] };
    const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
    const next = sinon.stub();

    quantitySalesValidation2(req, res, next);

    expect(res.status.calledWith(422)).to.equal(true);
    expect(res.json.calledWith({ message: '"quantity" must be greater than or equal to 1' })).to.equal(true);
    expect(next.called).to.equal(false);
  });

  it('should call next if productId and quantity are provided and quantity is greater than 0', function () {
    const req = { body: [{ productId: '1', quantity: 1 }] };
    const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
    const next = sinon.stub();

    productIdSalesValidation(req, res, next);
    quantitySalesValidation(req, res, next);
    quantitySalesValidation2(req, res, next);

    expect(res.status.called).to.equal(false);
    expect(res.json.called).to.equal(false);
    expect(next.calledThrice).to.equal(true);
  });
});