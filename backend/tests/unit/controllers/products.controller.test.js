const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const serviceProduct = require('../../../src/services/products.service');
const controller = require('../../../src/controllers/products.controller');

const { deleteProduct } = controller;

chai.use(sinonChai);
const { expect } = chai;

describe('Test the product controller', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('getProductsById should return a product by ID', async function () {
    const mockProduct = { id: 1, name: 'Product Test' };
    sinon.stub(serviceProduct, 'getProductsById').resolves({ status: 200, data: mockProduct });

    const req = { params: { id: '1' } };
    const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
    await controller.getProductsById(req, res);

    expect(serviceProduct.getProductsById).to.have.been.calledWith('1');
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(mockProduct);
  });

  it('updateProduct should update an existing product', async function () {
    const productId = '1';
    const updatedProduct = { name: 'Produto Atualizado' };
    sinon.stub(serviceProduct, 'updateProduct').resolves({ status: 200, data: updatedProduct });

    const req = { params: { id: productId }, body: updatedProduct };
    const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
    await controller.updateProduct(req, res);

    expect(serviceProduct.updateProduct).to.have.been.calledWith(productId, updatedProduct.name);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(updatedProduct);
  });

  it('should return the status and data from the service', async function () {
    const req = { params: { id: '1' } };
    const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
    const deleteProductStub = sinon.stub(serviceProduct, 'deleteProduct').resolves({ status: 200, data: { message: 'Product deleted' } });

    await deleteProduct(req, res);

    expect(res.status.calledWith(200)).to.equal(true);
    expect(res.json.calledWith({ message: 'Product deleted' })).to.equal(true);
    deleteProductStub.restore();
  });
});