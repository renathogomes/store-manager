// const chai = require('chai');
// const sinon = require('sinon');

// const { expect } = chai;

// const connection = require('../../../src/models/connection');
// const productsModel = require('../../../src/models/products.model');
// const productsMock = require('../../mock/products.mock');

// describe('Testa o model de produtos', function () {
//   describe('Testa o model de produtos, quando a conexão é bem sucedida', function () {
//     before(function () {
//       sinon.stub(connection, 'execute')
//         .resolves([productsMock.productsMock]);
//     });
    
//     after(function () {
//       connection.execute.restore();
//     });
    
//     it('Retorna um array', async function () {
//       const response = await productsModel.getAll();
//       expect(response).to.be.an('array');
//     });
    
//     it('Retorna um array de objetos', async function () {
//       const response = await productsModel.getAll();
//       expect(response[0]).to.be.an('object');
//     });
    
//     it('Retorna um array de objetos com as chaves "id" e "name"', async function () {
//       const response = await productsModel.getAll();
//       expect(response[0]).to.have.all.keys('id', 'name');
//     });
//   }); 
// });