const chai = require('chai');
const sinon = require('sinon');
const model = require('../../../src/models/sales.model');
const service = require('../../../src/services/sales.service');

const { expect } = chai;

describe('Test the sales service', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('getSalesById should return a sale by ID', async function () {
    const mockSale = { id: 1, name: 'Sale Test' };
    sinon.stub(model, 'getById').resolves(mockSale);

    const result = await service.getSalesById(1);

    expect(model.getById).to.have.been.calledWith(1);
    expect(result).to.deep.equal({ status: 200, data: mockSale });
  });

  //   it('createSaleService should create a sale with existing products', async function () {
  //     const mockProducts = [{ id: 1, name: 'Product 1' }, { id: 2, name: 'Product 2' }];
  //     sinon.stub(model.productModel, 'getById').resolves(mockProducts[0]);
  
  //     const result = await service.createSaleService([{ productId: 1, quantity: 2 }]);
  
  //     expect(model.productModel.getById).to.have.been.calledOnceWith(1);
  //     expect(result).to.deep.equal({ status: 201, data: { id: 'generatedId', itemsSold: [{ productId: 1, quantity: 2 }] } });
  //   });
  
  // it('createSaleService should return a 404 status when a product is not found', async function () {
  //   sinon.stub(model.productModel, 'getById').resolves(null);
  
  //   const result = await service.createSaleService([{ productId: 1, quantity: 2 }]);
  
  //   expect(model.productModel.getById).to.have.been.calledOnceWith(1);
  //   expect(result).to.deep.equal({ status: 404, data: { message: 'Product not found' } });
  // });
});