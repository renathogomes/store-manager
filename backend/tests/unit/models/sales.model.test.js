const chai = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const salesModel = require('../../../src/models/sales.model');

const { expect } = chai;

describe('Testa o modelo de vendas', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('getAll deve retornar todas as vendas', async function () {
    const mockSales = [{ id: 1, name: 'Sale Test' }];
    sinon.stub(connection, 'query').resolves(mockSales);

    const sales = await salesModel.getAll();

    expect(connection.query).to.have.been.calledWith('SELECT * FROM sales');
    expect(sales).to.deep.equal(mockSales);
  });

  it('getById deve retornar uma venda pelo id', async function () {
    const mockSale = { id: 1, name: 'Sale Test' };
    sinon.stub(connection, 'query').resolves([mockSale]);

    const sale = await salesModel.getById(1);

    expect(connection.query).to.have.been.calledWith('SELECT * FROM sales WHERE id = ?', [1]);
    expect(sale).to.deep.equal(mockSale);
  });
});