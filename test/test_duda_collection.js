require('dotenv').config();

const { Duda, Envs } = require('../dist/base');
const { TEST_SITE_NAME } = require("./helpers");
const { v4: uuidv4 } = require('uuid');

let duda;

beforeEach ('instantiate a new Duda instance', function() {
  duda = new Duda({ environment: Envs.Sandbox });
})

describe('Duda.collections', async function() {
  this.timeout(10000);

  const collection_name = uuidv4();
  const collection_ext_id = uuidv4();

  it ('can successfully create a collection', function() {
    return duda.collections.create({
      site_name: TEST_SITE_NAME,
      name: collection_name,
      fields: [
        { name: "email", type: "email" },
      ],
      external_details: {
        enabled: true,
        external_endpoint: "https://dm-util.s3.amazonaws.com/russ/dynamic-pages/dynamic-pages-tour.json",
        external_id: collection_ext_id,
      }
    })
  })

  it ('can successfully get all collections', function() {
    return duda.collections.list({
      site_name: TEST_SITE_NAME,
    }).then((response) => response[0].name);
  })

  it ('can successfully get a specific collection', function() {
    return duda.collections.get({
      site_name: TEST_SITE_NAME,
      collection_name: collection_name,
    })
  })

  const new_collection_name = uuidv4();

  it ('can successfully update a specific collection', function() {
    return duda.collections.update({
      name: new_collection_name,
      site_name: TEST_SITE_NAME,
      current_collection_name: collection_name,
    })
  })

  it ('can successfully clear cache for a specific collection', function() {
    return duda.collections.clearCache({
      site_name: TEST_SITE_NAME,
      collection_name: new_collection_name,
    })
  })

  it ('can successfully clear cache for specific collections by external_id', function() {
    return duda.collections.clearCacheByExtID({
      external_id: collection_ext_id,
    })
  })

  it ('can successfully delete a collection', async function() {
    return duda.collections.delete({
      site_name: TEST_SITE_NAME,
      collection_name: new_collection_name,
    })
  })

  describe('Duda.collections.row', async function() {
    let new_collection = uuidv4();
    let rows;

    before ('create a collection for testing', async function() {
      await duda.collections.create({
        site_name: TEST_SITE_NAME,
        name: new_collection,
        fields: [ { name: "email", type: "email" } ],
      })
    })

    it ('can successfully add a row to a collection', async function() {
      return duda.collections.rows.create({
        site_name: TEST_SITE_NAME,
        collection_name: new_collection,
        raw_body: [
          { data: { email: `${ uuidv4() }@example.com` } },
        ]
      }).then((response) => rows = response);
    })

    it ('can successfully update a row in a collection', function() {
      return duda.collections.rows.update({
        site_name: TEST_SITE_NAME,
        collection_name: new_collection,
        raw_body: rows.map((row) => (row.email = `${ uuidv4() }@example.com`) && row),
      })
    })

    it ('can successfully delete a row from a collection', function() {
      return duda.collections.rows.delete({
        site_name: TEST_SITE_NAME,
        collection_name: new_collection,
        raw_body: rows.map((row) => row.id),
      })
    })

    after ('delete the test collection from the site', async function() {
      await duda.collections.delete({
        site_name: TEST_SITE_NAME,
        collection_name: new_collection,
      })
    })
  })

  describe('Duda.collections.fields', function() {
    const new_collection = uuidv4();
    const field_name = uuidv4();
    const updated_field_name = uuidv4();
    const new_field_name = uuidv4();

    before ('create a collection for testing', async function() {
      await duda.collections.create({
        site_name: TEST_SITE_NAME,
        name: new_collection,
        fields: [ { name: field_name, type: "email" } ],
      })
    })

    it ('can successfully add a field to a collection', function() {
      return duda.collections.fields.create({
        site_name: TEST_SITE_NAME,
        collection_name: new_collection,
        raw_body: [
          { name: new_field_name, type: "email" },
        ]
      })
    })

    it ('can successfully update a field in a collection', function() {
      return duda.collections.fields.update({
        site_name: TEST_SITE_NAME,
        collection_name: new_collection,
        field_name: new_field_name,
        name: updated_field_name,
      })
    })

    it ('can successfully delete a field in a collection', function() {
      return duda.collections.fields.update({
        site_name: TEST_SITE_NAME,
        collection_name: new_collection,
        field_name: updated_field_name,
      })
    })

    after ('delete the test collection from the site', async function() {
      await duda.collections.delete({
        site_name: TEST_SITE_NAME,
        collection_name: new_collection,
      })
    })
  })
})