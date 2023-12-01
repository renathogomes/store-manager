const sinon = require('sinon');
const { expect } = require('chai');
const { createProductValidation } = require('../../../src/middlewares/createProductValidation');

describe('createProductValidation', function () {
  it('should return 400 if name is not provided', function () {
    const req = {
      body: {},
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    const next = sinon.stub();

    createProductValidation(req, res, next);

    expect(res.status.calledWith(400)).to.equal(true);
    expect(res.json.calledWith({ message: '"name" is required' })).to.equal(true);
    expect(next.called).to.equal(false);
  });

  it('should return 422 if name length is less than 5', function () {
    const req = {
      body: { name: 'abc' },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    const next = sinon.stub();

    createProductValidation(req, res, next);

    expect(res.status.calledWith(422)).to.equal(true);
    expect(res.json.calledWith({ message: '"name" length must be at least 5 characters long' })).to.equal(true);
    expect(next.called).to.equal(false);
  });

  it('should call next if name is provided and its length is at least 5', function () {
    const req = {
      body: { name: 'abcde' },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    const next = sinon.stub();

    createProductValidation(req, res, next);

    expect(res.status.called).to.equal(false);
    expect(res.json.called).to.equal(false);
    expect(next.called).to.equal(true);
  });
});