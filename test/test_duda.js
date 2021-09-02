require('dotenv').config();

const chai = require('chai');
const expect = chai.expect;
chai.use(require('chai-as-promised'));

const { Duda } = require('../dist/base');

let duda;

before('instantiate Duda instance', function () {
  duda = new Duda({ env: "sandbox" });
})

describe('Duda', function () {
  this.timeout(10000);

  it('can make a request', async function () {
    await expect(duda.get("/sites/multiscreen/templates")).to.be.fulfilled;
  })
})