require('dotenv').config();

const { GetTestSite, DeleteTestSite } = require('./helpers');
const { Duda } = require('../dist/base');
const { v4: uuidv4 } = require("uuid");

let duda;
let test_site;

before ('create a new site to test against', async function() {
  this.timeout(10000);
  test_site = await GetTestSite();
})

before('instantiate a new Duda instance', function () {
  duda = new Duda({ env: Duda.Environments.Sandbox });
})

describe('Duda.reporting', function () {
  this.timeout(30000);

  const account_name = uuidv4();

  before('create an account to test against', async function () {
    await duda.accounts.create({
      account_name: account_name,
      account_type: "CUSTOMER",
    })
  })

  it('can successfully get a list of recently published sites', function () {
    return duda.reporting.sites.published({
      last_days: 7,
    })
  })

  it('can successfully get a list of recently unpublished sites', function () {
    return duda.reporting.sites.unpublished({
      last_days: 7,
    })
  })

  it('can successfully get a list of created sites', function () {
    return duda.reporting.sites.created({
      from: "2021-01-01",
      to: "2021-12-01",
    })
  })

  it('can successfully get a list of form submissions', function () {
    return duda.reporting.forms.submissions({
      site_name: test_site,
      from: "2021-01-01",
      to: "2021-12-01",
    })
  })

  it('can successfully subscribe a customer to a site', function () {
    return duda.reporting.emailSettings.subscribe({
      account_name: account_name,
      site_name: test_site,
      frequency: "WEEKLY",
    })
  })

  it('can successfully get email settings for an account', function () {
    return duda.reporting.emailSettings.get({
      account_name: account_name,
      site_name: test_site,
    })
  })

  it('can successfully unsubscribe a customer to a site', function () {
    return duda.reporting.emailSettings.unsubscribe({
      account_name: account_name,
      site_name: test_site,
    })
  })

  after('delete the test account', async function () {
    await duda.accounts.delete({
      account_name: account_name,
    })
  })

  describe('Duda.reporting.analytics', function () {
    it('can successfully get analytics history for a site', function () {
      return duda.reporting.analytics.get({
        site_name: test_site,
        from: "2021-01-01",
        to: "2021-12-01",
        dimension: "system",
        result: "activities",
        date_granularity: "WEEKS",
      })
    })
  })

  describe('Duda.reporting.activity', function () {
    it('can successfully get the activity log for a site', function () {
      return duda.reporting.activities.get({
        site_name: test_site,
        limit: 100,
        offset: 0,
        from: "2021-01-01",
        to: "2021-12-01",
        activities: ["site_created", "site_published", "page_created", "page_deleted"],
      })
    })
  })
})

after ('delete the test site', async function() {
  this.timeout(10000);
  await DeleteTestSite();
})