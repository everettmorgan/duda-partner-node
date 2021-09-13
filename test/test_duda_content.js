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

beforeEach('instantiate a new Duda instance', function () {
  duda = new Duda({ environment: Duda.Environments.Sandbox });
})

describe('Duda.content', function () {
  this.timeout(30000);

  it('can successfully get the content library for a site', function () {
    return duda.content.get({
      site_name: test_site,
    })
  })

  it('can successfully update the content of a site', function () {
    return duda.content.update({
      site_name: test_site,
      business_data: {
        name: uuidv4(),
      }
    })
  })

  it('can successfully publish the content library of a site', async function () {
    await duda.sites.publish({
      site_name: test_site,
    })

    return duda.content.publish({
      site_name: test_site,
    })
  })

  describe('Duda.content.multilocation', function () {
    let location_uuid;

    it('can successfully create a new location for a site', function () {
      return duda.content.multilocation.create({
        site_name: test_site,
        label: uuidv4(),
      }).then((response) => location_uuid = response.uuid);
    })

    it('can successfully get specific location data for a site', function () {
      return duda.content.multilocation.get({
        site_name: test_site,
        location_id: location_uuid,
      })
    })

    it('can successfully update a location for a site', function () {
      return duda.content.multilocation.update({
        site_name: test_site,
        location_id: location_uuid,
        label: uuidv4(),
      })
    })

    it('can successfully delete a location for a site', function () {
      return duda.content.multilocation.delete({
        site_name: test_site,
        location_id: location_uuid,
      })
    })
  })

  describe('Duda.content.other', function () {
    it('can successfully upload a resource to a site\'s content library', function () {
      return duda.content.uploadResource({
        site_name: test_site,
        raw_body: [
          { src: "https://via.placeholder.com/150", resource_type: "IMAGE" },
          { src: "https://via.placeholder.com/150", resource_type: "IMAGE" },
          { src: "https://via.placeholder.com/150", resource_type: "IMAGE" },
          { src: "https://via.placeholder.com/150", resource_type: "IMAGE" },
          { src: "https://via.placeholder.com/150", resource_type: "IMAGE" },
        ]
      })
    })

    it('can successfully inject content into a site', function () {
      return duda.content.injectedContent.create({
        site_name: test_site,
        raw_body: [
          { type: "INNERHTML", key: "my-key-email", value: "newEmail@domain.com" },
          { type: "CSS", key: "email-css", value: "#000000", important: false, refs: ["color"] },
          { type: "DOMATTR", key: "my-key-email", value: "mailto:newEmail@domain.com", refs: ["href"] },
        ]
      })
    })

    let random_key = uuidv4();

    it('can successfully inject content into a specific page of a site', async function () {
      let page_name = await duda.pages.list({
        site_name: test_site,
      }).then((response) => response[0].page_name);

      return duda.content.injectedContent.createSPA({
        site_name: test_site,
        page_name: page_name,
        raw_body: [
          { type: "INNERHTML", key: random_key, value: "newEmail@domain.com" },
          { type: "CSS", key: random_key, value: "#000000", important: false, refs: ["color"] },
          { type: "DOMATTR", key: random_key, value: "mailto:newEmail@domain.com", refs: ["href"] },
        ]
      })
    })

    it('can successfully get injected content from a site', function () {
      return duda.content.injectedContent.get({
        site_name: test_site,
        key: random_key,
        type: "CSS",
        ref: "color",
      })
    })
  })
})

after ('delete the test site', async function() {
  this.timeout(10000);
  await DeleteTestSite();
})