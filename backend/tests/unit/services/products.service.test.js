// const chai = require('chai');
// const sinon = require('sinon');

// const { expect } = chai;

// const productsMock = require('../../mock/products.mock');
// const ProductsService = require('../../../src/services/products.service');
// const productsModel = require('../../../src/models/products.model');

// describe('Testa a camada service', function () {
//   describe('Testa o método getProducts', function () {
//     it('Deve retornar um array de produtos', async function () {
//       sinon.stub(productsModel, 'getProducts').resolves(productsMock);
    
//       const products = await ProductsService.getProducts();
    
//       expect(products).to.be.an('array');
//       expect(products).to.be.deep.equal(productsMock);
//     });
//   });
// });