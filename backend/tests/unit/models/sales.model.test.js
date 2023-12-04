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
    const mockSales = [{ saleId: 1, productId: 1, quantity: 2, date: '2021-01-01' }];
    sinon.stub(connection, 'execute').resolves([mockSales]);

    const sales = await salesModel.getAll();

    expect(connection.execute).to.have.been.calledWith(
      `SELECT SP.sale_id, SP.product_id, SP.quantity, S.date
        FROM StoreManager.sales_products AS SP
        INNER JOIN StoreManager.products AS P 
        ON SP.product_id = P.id 
        INNER JOIN StoreManager.sales AS S 
        ON S.id = SP.sale_id
        ORDER BY sale_id, product_id;`,
    );
    expect(sales).to.deep.equal(mockSales);
  });

  it('getById deve retornar uma venda pelo id', async function () {
    const mockSale = { date: '2021-01-01', productId: 1, quantity: 2 };
    sinon.stub(connection, 'execute').resolves([mockSale]);

    const sale = await salesModel.getById(1);

    expect(connection.execute).to.have.been.calledWith(
      `SELECT S.date, SP.product_id, SP.quantity
        FROM StoreManager.sales_products AS SP
        INNER JOIN StoreManager.products AS P 
        ON SP.product_id = P.id 
        INNER JOIN StoreManager.sales AS S 
        ON S.id = SP.sale_id
        WHERE S.id = ?;`,
      [1],
    );
    expect(sale).to.deep.equal(mockSale);
  });
});