const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const serviceSales = require('../../../src/services/sales.service');
const controller = require('../../../src/controllers/sales.controller');

chai.use(sinonChai);
const { expect } = chai;

describe('Test the sales controller', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('getSalesById should return a sale by ID', async function () {
    const mockSale = { id: 1, name: 'Sale Test' };
    sinon.stub(serviceSales, 'getSalesById').resolves({ status: 200, data: mockSale });

    const req = { params: { saleId: '1' } };
    const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
    await controller.getSalesById(req, res);

    expect(serviceSales.getSalesById).to.have.been.calledWith('1');
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(mockSale);
  });

  it('createSaleController should create a sale', async function () {
    const req = { body: { id: 3, name: 'New Sale' } };
    const mockCreatedSale = { id: 3, name: 'New Sale' };
    sinon.stub(serviceSales, 'createSaleService').resolves({ status: 201, data: mockCreatedSale });
  
    const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
    await controller.createSaleController(req, res);
  
    expect(serviceSales.createSaleService).to.have.been.calledWith(req.body);
    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(mockCreatedSale);
  });
  it('should return the status and data from deleteSaleService', async function () {
    const req = { params: { saleId: '1' } };
    const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
    const deleteSaleServiceStub = sinon.stub(serviceSales, 'deleteSaleService').resolves({ status: 200, data: { message: 'Sale deleted' } });

    await controller.deleteSaleController(req, res);

    expect(res.status.calledWith(200)).to.equal(true);
    expect(res.json.calledWith({ message: 'Sale deleted' })).to.equal(true);
    deleteSaleServiceStub.restore();
  });

  it('should return the status and data from updateSaleService', async function () {
    const req = { params: { saleId: '1', productId: '1' }, body: { quantity: 1 } };
    const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
    const updateSaleServiceStub = sinon.stub(serviceSales, 'updateSaleService').resolves({ status: 200, data: { message: 'Sale updated' } });

    await controller.updateSaleController(req, res);

    expect(res.status.calledWith(200)).to.equal(true);
    expect(res.json.calledWith({ message: 'Sale updated' })).to.equal(true);
    updateSaleServiceStub.restore();
  });
});