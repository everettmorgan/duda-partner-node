require('dotenv').config();

const { Duda, Envs } = require('../dist/base');
const { GetTestSite, DeleteTestSite } = require('./helpers');
const { v4: uuidv4 } = require('uuid');

let duda;
let test_site;

before ('create a new site to test against', async function() {
  this.timeout(10000);
  test_site = await GetTestSite();
})

beforeEach ('instantiate a new Duda instance', function() {
  duda = new Duda({ environment: Envs.Sandbox });
})

describe('Duda.accounts', function() {
  this.timeout(10000);

  const account_name = uuidv4();

  it ('can successfully create an account', function() {
    return duda.accounts.create({
      account_name: account_name,
      first_name: "Hello",
      last_name: "World",
      lang: "en",
      email: "everett@example.com",
      account_type: "CUSTOMER",
    })
  })

  it ('can successfully get an account by name', function() {
    return duda.accounts.get({
      account_name: account_name,
    })
  })

  it ('can successfully update an account by name', function() {
    return duda.accounts.update({
      account_name: account_name,
      first_name: "World",
      last_name: "Hello",
      lang: "es",
      email: `${ uuidv4() }@example.net`,
    })
  })

  it ('can successfully delete an account by name', function() {
    return duda.accounts.delete({
      account_name: account_name,
    })
  })

  describe('Duda.accounts.permissions', function() {
    this.timeout(10000);

    const account_name = uuidv4();

    before ('create an account to test against', async function() {
      await duda.accounts.create({
        account_name: account_name,
      })
    })

    it ('can successfully grant site access for an account by name', function() {
      return duda.accounts.permissions.grantSiteAccess({
        account_name: account_name,
        site_name: test_site,
        permissions: ["EDIT"],
      })
    })

    it ('can successfully get all permissions', function() {
      return duda.accounts.permissions.list();
    })

    it ('can successfully get site permissions for an account by name', function() {
      return duda.accounts.permissions.get({
        account_name: account_name,
        site_name: test_site,
      })
    })

    it ('can successfully get all accessible sites for an account by name', function() {
      return duda.accounts.permissions.listAccessibleSites({
        account_name: account_name,
      })
    })

    it ('can successfully remove site access for an account by name', function() {
      return duda.accounts.permissions.removeSiteAccess({
        site_name: test_site,
        account_name: account_name,
      })
    })

    after ('remove test account', async function() {
      await duda.accounts.delete({
        account_name: account_name,
      })
    })
  })

  describe('Duda.accounts.authentication', function() {
    this.timeout(10000);

    const account_name = uuidv4();

    before ('create an account to test against', async function() {
      await duda.accounts.create({
        account_name: account_name,
      })
    })

    it ('can successfully get an SSO link for an account by name', function() {
      return duda.accounts.authentication.getSSOLink({
        account_name: account_name,
        site_name: test_site,
      })
    })

    it ('can successfully reset a password for an account by name', function() {
      return duda.accounts.authentication.getResetPasswordLink({
        account_name: account_name,
      })
    })

    after ('remove test account', async function() {
      await duda.accounts.delete({
        account_name: account_name,
      })
    })
  })
})

after ('delete the test site', async function() {
  this.timeout(10000);
  await DeleteTestSite();
})