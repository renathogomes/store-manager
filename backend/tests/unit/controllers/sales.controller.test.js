const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const serviceSales = require('../../../src/services/sales.service');
const controller = require('../../../src/controllers/sales.controller');

chai.use(sinonChai);
const { expect } = chai;

describe('Testa o controlador de vendas', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('getSalesById deve retornar uma venda pelo id', async function () {
    const mockSale = { id: 1, name: 'Sale Test' };
    sinon.stub(serviceSales, 'getSalesById').resolves({ status: 200, data: mockSale });

    const req = { params: { saleId: '1' } };
    const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
    await controller.getSalesById(req, res);

    expect(serviceSales.getSalesById).to.have.been.calledWith('1');
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(mockSale);
  });
});