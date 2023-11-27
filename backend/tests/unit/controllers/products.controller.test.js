const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;

chai.use(sinonChai);

const productsMock = require('../../mock/products.mock');
const ProductsController = require('../../../src/controllers/products.controller');
const productsService = require('../../../src/services/products.service');

describe('Testa a camada controller', function () {
  describe('Testa o método GET', function () {
    it('Deve retornar um array de produtos', async function () {
      const req = {};
      const res = {
        json: sinon.spy(),
      };
    
      sinon.stub(productsService, 'getProducts').resolves(productsMock);
    
      await ProductsController.getProducts(req, res);
    
      expect(res.json).to.have.been.calledWith(productsMock);
    });
  });
});
