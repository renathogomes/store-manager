const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const serviceProduct = require('../../../src/services/products.service');
const controller = require('../../../src/controllers/products.controller');

chai.use(sinonChai);
const { expect } = chai;

describe('Testa o controlador de produtos', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('getProductsById deve retornar um produto pelo id', async function () {
    const mockProduct = { id: 1, name: 'Product Test' };
    sinon.stub(serviceProduct, 'getProductsById').resolves({ status: 200, data: mockProduct });

    const req = { params: { id: '1' } };
    const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
    await controller.getProductsById(req, res);

    expect(serviceProduct.getProductsById).to.have.been.calledWith('1');
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(mockProduct);
  });
});