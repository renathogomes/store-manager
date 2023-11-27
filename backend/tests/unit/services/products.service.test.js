const chai = require('chai');
const sinon = require('sinon');
const productService = require('../../../src/services/products.service');
const productModel = require('../../../src/models/products.model');
const productsMock = require('../../mock/products.mock');

const { expect } = chai;

describe('Testa o serviço de produtos', function () {
  describe('getProduct', function () {
    it('Deve retornar produtos quando a busca é bem sucedida', async function () {
      sinon.stub(productModel, 'getAll').resolves(productsMock.productsMock);
      const response = await productService.getProduct();
      expect(response).to.deep.equal({ status: 200, data: productsMock.productsMock });
      productModel.getAll.restore();
    });

    it('Deve retornar status 404 e mensagem quando nenhum produto é encontrado', async function () {
      sinon.stub(productModel, 'getAll').resolves(null);
      const response = await productService.getProduct();
      expect(response).to.deep.equal({ status: 404, message: 'Products not found' });
      productModel.getAll.restore();
    });
  });

  describe('getProductsById', function () {
    it('Deve retornar um produto quando o ID é válido', async function () {
      const id = 1;
      sinon.stub(productModel, 'getById').resolves(productsMock.productByIdMock);
      const response = await productService.getProductsById(id);
      expect(response).to.deep.equal({ status: 200, data: productsMock.productByIdMock });
      productModel.getById.restore();
    });

    it('Deve retornar status 404 e mensagem quando nenhum produto é encontrado com o ID fornecido', async function () {
      const id = 999;
      sinon.stub(productModel, 'getById').resolves(null);
      const response = await productService.getProductsById(id);
      expect(response).to.deep.equal({ status: 404, message: 'Product not found' });
      productModel.getById.restore();
    });
  });
});