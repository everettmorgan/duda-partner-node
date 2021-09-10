require('dotenv').config();

const { Duda, Envs } = require('../dist/base');
const { v4: uuidv4 } = require("uuid");
const chai = require('chai');
const expect = chai.expect;
chai.use(require('chai-as-promised'));

let duda;

before('instantiate Duda instance', function () {
  duda = new Duda({ environment: Envs.Sandbox });
})

describe('Duda.templates', function () {
  this.timeout(30000);

  let template_id;

  it('can successfully get all templates', function () {
    return duda.templates.list().then((templates) => template_id = templates[0].template_id);
  })

  it('can successfully create a new template from an existing one', function () {
    return duda.templates.createFromTemplate({
      template_id: template_id,
      new_template_name: uuidv4(),
    }).then(async (template) => template_id = template.template_id);
  })

  it('can successfully get template by id', async function () {
    await duda.templates.get({
      template_id: template_id,
    }).then((response) => {
      expect(response.template_id).to.equal(template_id);
    })
  })

  it('can successfully update a template by id', function () {
    return duda.templates.update({
      template_id: template_id,
      new_name: uuidv4(),
    })
  })

  it('can successfully create a new template from a site', async function () {
    const site = await duda.sites.create({
      template_id: template_id,
    })

    return duda.templates.createFromSite({
      site_name: site.site_name,
      new_template_name: uuidv4(),
    }).then(async (template) => {
      await duda.templates.delete({
        template_id: template.template_id,
      });
      await duda.sites.delete({
        site_name: site.site_name,
      });
    })
  })

  it('can successfully delete a template by id', async function () {
    return duda.templates.delete({
      template_id: template_id,
    })
  })
})