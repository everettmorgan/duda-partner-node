require('dotenv').config();

const { Duda } = require('../dist/base');
const { v4: uuidv4 } = require("uuid");

let duda;

before ('instantiate a new Duda instance', function() {
    duda = new Duda({ env: Duda.Environments.Sandbox });
})

describe('Duda.sites', function() {
    this.timeout(60000);

    let site_name;

    it ('can successfully create a site', function() {
        return duda.sites.create({ 
            template_id: 1010905,
        }).then((response) => site_name = response.site_name);
    })

    it ('can successfully get a site by name', async function() {
        return duda.sites.get({
            site_name: site_name
        })
    })

    const external_id = uuidv4();

    it ('can successfully update a site', async function() {
        return duda.sites.update({
            site_name: site_name,
            external_uid: external_id,
        })
    })

    it ('can successfully get a site by external id', async function() {
        return duda.sites.getByExternalID({
            external_uid: external_id
        })
    })

    it ('can successfully publish a site', async function() {
        return duda.sites.publish({
            site_name: site_name,
        })
    })

    it ('can successfully unpublish a site', async function() {
        return duda.sites.unpublish({
            site_name: site_name
        })
    })

    it ('can successfully duplicate a site', async function() {
        return duda.sites.duplicate({
            site_name: site_name,
            new_default_domain_prefix: uuidv4()
        }).then(async (site) => await duda.sites.delete({
            site_name: site.site_name,
        }))
    })

    it ('can successfully reset a site', function() {
        return duda.sites.reset({
            site_name: site_name,
            template_id: 1010905,
            site_data: {
                remove_biz_infos: false,
            }
        })
    })

    it ('can successfully switch the template of a site', function() {
        return duda.sites.switchTemplate({
            site_name: site_name,
            template_id: 1036413,
        })
    })

    it ('can successfully delete a site', function() {
        return duda.sites.delete({
            site_name: site_name,
        })
    })
})