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
  it('should insert sales and sales_products and return insertId', async function () {
    const executeStub = sinon.stub(connection, 'execute');
    executeStub.onFirstCall().resolves([{ insertId: '1' }]);
    executeStub.onSecondCall().resolves();

    const sales = [{ productId: '1', quantity: 1 }];
    const insertId = await salesModel.createSales(sales);

    expect(insertId).to.equal('1');
    expect(executeStub.calledWith(
      'INSERT INTO StoreManager.sales () VALUES ()',
    )).to.equal(true);
    expect(executeStub.calledWith(
      'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)',
      ['1', '1', 1],
    )).to.equal(true);

    executeStub.restore();
  });

  it('should delete a sale', async function () {
    const executeStub = sinon.stub(connection, 'execute').resolves();

    const saleId = '1';
    await salesModel.deleteSale(saleId);

    expect(executeStub.calledWith(
      'DELETE FROM StoreManager.sales WHERE id = ?',
      [saleId],
    )).to.equal(true);

    executeStub.restore();
  });

  it('should update a sale', async function () {
    const executeStub = sinon.stub(connection, 'execute').resolves();

    const saleId = '1';
    const productId = '1';
    const quantity = 1;
    await salesModel.updateSale(saleId, productId, quantity);

    expect(executeStub.calledWith(
      'UPDATE StoreManager.sales_products SET quantity = ? WHERE sale_id = ? AND product_id = ?',
      [quantity, saleId, productId],
    )).to.equal(true);

    executeStub.restore();
  });
});