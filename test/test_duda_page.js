require('dotenv').config();

const { Duda, Envs } = require('../dist/base');
const { v4: uuidv4 } = require('uuid');

const { TEST_SITE_NAME } = require('./helpers');

let duda;

beforeEach ('instantiate a new Duda instance', function() {
  duda = new Duda({ environment: Envs.Sandbox });
})

describe ('Duda.pages', function() {
  this.timeout(30000);

  let page_name;
  
  it ('can successfully get all pages for a site name', function() {
    return duda.pages.list({
      site_name: TEST_SITE_NAME,
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
      site_name: TEST_SITE_NAME,
      page_name: page_name,
      page_title: new_page,
    })
  })

  it ('can successfully get a page by name', function() {
    return duda.pages.get({
      site_name: TEST_SITE_NAME,
      page_name: page_name,
    })
  })

  it ('can successfully update a page by name', function() {
    return duda.pages.update({
      site_name: TEST_SITE_NAME,
      page_name: page_name,
      page_title: uuidv4(),
    })
  })

  it ('can successfully delete a page by name', async function() {
    const not_home = await duda.pages.list({
      site_name: TEST_SITE_NAME,
    }).then((response) => {
      const pages = response.filter(a => a.page_path !== "home");
      return pages[0].page_name;
    }).catch((err) => console.log(err))

    return duda.pages.delete({
      site_name: TEST_SITE_NAME,
      page_name: not_home,
    })
  })
})