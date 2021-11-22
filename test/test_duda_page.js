require('dotenv').config();

const { Duda } = require('../dist/base');
const { GetTestSite, DeleteTestSite } = require('./helpers');
const { v4: uuidv4 } = require('uuid');

let duda;
let test_site;

before ('create a new site to test against', async function() {
  this.timeout(10000);
  test_site = await GetTestSite();
})

beforeEach ('instantiate a new Duda instance', function() {
  duda = new Duda({ env: Duda.Environments.Sandbox });
})

describe ('Duda.pages', function() {
  this.timeout(30000);

  let page_name;
  
  it ('can successfully get all pages for a site name', function() {
    return duda.pages.list({
      site_name: test_site,
    }).then((response) => {
      if (Array.isArray(response)) {
        page_name = response[response.length - 1].page_name;
      } else {
        page_name = response.page_name;
      }
    });
  })

  let new_page = uuidv4();

  it ('can successfully duplicate a page by name', function() {
    return duda.pages.duplicate({
      site_name: test_site,
      page_name: page_name,
      page_title: new_page,
    })
  })

  it ('can successfully get a page by name', function() {
    return duda.pages.get({
      site_name: test_site,
      page_name: page_name,
    })
  })

  it ('can successfully update a page by name', function() {
    return duda.pages.update({
      site_name: test_site,
      page_name: page_name,
      page_title: uuidv4(),
    })
  })

  it ('can successfully delete a page by name', async function() {
    const not_home = await duda.pages.list({
      site_name: test_site,
    }).then((response) => {
      const pages = response.filter(a => a.page_path !== "home");
      return pages[0].page_name;
    }).catch((err) => console.log(err))

    return duda.pages.delete({
      site_name: test_site,
      page_name: not_home,
    })
  })
})

describe('Duda.pages.v2', function() {
  this.timeout(30000);

  let page_uuid;
  
  it ('can successfully get all pages of a site', function() {
    return duda.pages.v2.list({
      site_name: test_site,
    }).then((response) => {
      page_uuid = response.results[response.results.length - 1].uuid;
    });
  })

  let new_page = uuidv4();

  it ('can successfully duplicate a page by uuid', function() {
    return duda.pages.v2.duplicate({
      site_name: test_site,
      page_uuid: page_uuid,
      title: new_page,
    })
  })

  it ('can successfully get a page by uuid', function() {
    return duda.pages.v2.get({
      site_name: test_site,
      page_uuid: page_uuid,
    })
  })

  it ('can successfully update a page by uuid', function() {
    return duda.pages.v2.update({
      site_name: test_site,
      page_uuid: page_uuid,
      title: uuidv4(),
    })
  })

  it ('can successfully delete a page by uuid', async function() {
    const not_home = await duda.pages.v2.list({ site_name: test_site })
    .then((response) => {
      const pages = response.results.filter(
        a => a.path !== "home"
      );
      return pages[0].uuid;
    })
    .catch((err) => console.log(err))

    return duda.pages.v2.delete({
      site_name: test_site,
      page_uuid: not_home,
    })
  })
})

after ('delete the test site', async function() {
  this.timeout(10000);
  await DeleteTestSite();
})