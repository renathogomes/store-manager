const chai = require('chai');
const sinon = require('sinon');
const model = require('../../../src/models/sales.model');
const service = require('../../../src/services/sales.service');

const { expect } = chai;

describe('Testa o serviço de vendas', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('getSalesById deve retornar uma venda pelo id', async function () {
    const mockSale = { id: 1, name: 'Sale Test' };
    sinon.stub(model, 'getById').resolves(mockSale);

    const result = await service.getSalesById(1);

    expect(model.getById).to.have.been.calledWith(1);
    expect(result).to.deep.equal({ status: 200, data: mockSale });
  });
});