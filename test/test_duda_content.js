require('dotenv').config();

const { Duda, Envs } = require('../dist/base');
const { TEST_SITE_NAME } = require("./helpers");
const { v4: uuidv4 } = require('uuid');

let duda;

beforeEach('instantiate a new Duda instance', function () {
  duda = new Duda({ environment: Envs.Sandbox });
})

describe('Duda.content', function () {
  this.timeout(30000);

  it('can successfully get the content library for a site', function () {
    return duda.content.get({
      site_name: TEST_SITE_NAME,
    })
  })

  it('can successfully update the content of a site', function () {
    return duda.content.update({
      site_name: TEST_SITE_NAME,
      business_data: {
        name: uuidv4(),
      }
    })
  })

  it('can successfully publish the content library of a site', async function () {
    await duda.sites.publish({
      site_name: TEST_SITE_NAME,
    })

    return duda.content.publish({
      site_name: TEST_SITE_NAME,
    })
  })

  describe('Duda.content.multilocation', function () {
    let location_uuid;

    it('can successfully create a new location for a site', function () {
      return duda.content.multilocation.create({
        site_name: TEST_SITE_NAME,
        label: uuidv4(),
      }).then((response) => location_uuid = response.uuid);
    })

    it('can successfully get specific location data for a site', function () {
      return duda.content.multilocation.get({
        site_name: TEST_SITE_NAME,
        location_id: location_uuid,
      })
    })

    it('can successfully update a location for a site', function () {
      return duda.content.multilocation.update({
        site_name: TEST_SITE_NAME,
        location_id: location_uuid,
        label: uuidv4(),
      })
    })

    it('can successfully delete a location for a site', function () {
      return duda.content.multilocation.delete({
        site_name: TEST_SITE_NAME,
        location_id: location_uuid,
      })
    })
  })

  describe('Duda.content.other', function () {
    it('can successfully upload a resource to a site\'s content library', function () {
      return duda.content.uploadResource({
        site_name: TEST_SITE_NAME,
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
        site_name: TEST_SITE_NAME,
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
        site_name: TEST_SITE_NAME,
      }).then((response) => response[0].page_name);

      return duda.content.injectedContent.createSPA({
        site_name: TEST_SITE_NAME,
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
        site_name: TEST_SITE_NAME,
        key: random_key,
        type: "CSS",
        ref: "color",
      })
    })
  })
})