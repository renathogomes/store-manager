const chai = require('chai');
const sinon = require('sinon');
const productService = require('../../../src/services/products.service');
const productModel = require('../../../src/models/products.model');
const productsMock = require('../../mock/products.mock');

const { deleteProduct } = productService;

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
      expect(response).to.deep.equal({ status: 404, data: { message: 'Product not found' } });
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
      expect(response).to.deep.equal({ status: 404, data: { message: 'Product not found' } });
      productModel.getById.restore();
    });
  });
  describe('deleteProduct', function () {
    it('should return 404 if product does not exist', async function () {
      const getByIdStub = sinon.stub(productModel, 'getById').resolves([]);
      const id = '1';
  
      const result = await deleteProduct(id);
  
      expect(result).to.deep.equal({ status: 404, data: { message: 'Product not found' } });
      getByIdStub.restore();
    });
  
    it('should return 204 and delete the product if it exists', async function () {
      const getByIdStub = sinon.stub(productModel, 'getById').resolves([{ id: '1', name: 'Product' }]);
      const excludeStub = sinon.stub(productModel, 'exclude').resolves();
      const id = '1';
  
      const result = await deleteProduct(id);
  
      expect(result).to.deep.equal({ status: 204 });
      expect(excludeStub.calledWith(id)).to.equal(true);
      getByIdStub.restore();
      excludeStub.restore();
    });
  });
});