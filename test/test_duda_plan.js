require('dotenv').config();

const { Duda } = require('../dist/base');
const { GetTestSite, DeleteTestSite } = require('./helpers');
const { v4: uuidv4 } = require('uuid');

let duda;
let test_site;

before ('get plans on an account', async function() {
  this.timeout(10000);
  test_site = await GetTestSite();
})

beforeEach ('instantiate a new Duda instance', function() {
  duda = new Duda({ env: Duda.Environments.Sandbox });
})

describe ('Duda.plans', function() {
    it('can get available site plans', function() {
        return duda.plans.list();
    })
    it('can get a site plan by site name', function () {
        return duda.plans.get({site_name:test_site});
    })
    it('can update site plan', async function() {
        const [first] = await duda.plans.list();
        return duda.plans.update({site_name:test_site,plan_id:first.planId})
    })
})

after ('delete the test site', async function() {
  this.timeout(10000);
  await DeleteTestSite();
})