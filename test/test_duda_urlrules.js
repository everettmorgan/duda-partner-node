require('dotenv').config();

const { Duda } = require('../dist/base');
const { GetTestSite, DeleteTestSite } = require('./helpers');

let duda;
let test_site;

before ('create a new site to test against', async function() {
  this.timeout(10000);
  test_site = await GetTestSite();
})

beforeEach ('instantiate a new Duda instance', async function() {
  duda = new Duda({ env: Duda.Environments.Sandbox });
})

describe('Duda.urlrules', function() {
  it('can get all url rules', function() {
    return duda.urlRules.getAll({ site_name: test_site });
  })

  let url_rule_id;

  it('can create a new url rule', function() {
    return duda.urlRules.create({
      site_name: test_site,
      source: '/',
      target: 'https://www.example.net',
      response_code: 302
    }).then((resp) => url_rule_id = resp.id);
  })

  it('can get a url rule by id', function() {
    return duda.urlRules.get({
      site_name: test_site,
      id: url_rule_id
    });
  })

  it('can update a url rule by id', function() {
    return duda.urlRules.update({
      site_name: test_site,
      id: url_rule_id,
      source: '/store'
    });
  })

  it('can delete a url rule by id', function() {
    return duda.urlRules.delete({
      site_name: test_site,
      id: url_rule_id
    });
  })
})

after ('delete the test site', async function() {
  this.timeout(10000);
  await DeleteTestSite();
})